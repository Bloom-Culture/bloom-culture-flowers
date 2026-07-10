import csv
import json
import os
import urllib.request
import urllib.error

# Config
STOREFRONT_DOMAIN = "bloomcultureflowers.myshopify.com"
API_VERSION = "2024-01"

# Load .env manually so it just works
with open(".env") as f:
    for line in f:
        if "=" in line and not line.startswith("#"):
            k, v = line.strip().split("=", 1)
            os.environ[k] = v

ADMIN_TOKEN = os.environ.get("ADMIN_API_ACCESS_TOKEN") or os.environ.get("SHOPIFY_ADMIN_API_TOKEN")

if not ADMIN_TOKEN:
    print("Error: SHOPIFY_ADMIN_API_TOKEN environment variable not set.")
    exit(1)

GRAPHQL_URL = f"https://{STOREFRONT_DOMAIN}/admin/api/{API_VERSION}/graphql.json"

import time

def run_query(query, variables=None, retries=3):
    data = {"query": query}
    if variables:
        data["variables"] = variables
        
    req = urllib.request.Request(
        GRAPHQL_URL,
        data=json.dumps(data).encode("utf-8"),
        headers={
            "X-Shopify-Access-Token": ADMIN_TOKEN,
            "Content-Type": "application/json"
        }
    )
    
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req) as response:
                return json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            print(f"HTTP Error: {e.code} - {e.read().decode('utf-8')}")
            return None
        except Exception as e:
            print(f"  -> Network error on attempt {attempt+1}: {e}")
            if attempt < retries - 1:
                time.sleep(2)
            else:
                raise
    return None

# Find Product ID by exact title
SEARCH_QUERY = """
query($titleQuery: String!) {
  products(first: 1, query: $titleQuery) {
    edges {
      node {
        id
        title
      }
    }
  }
}
"""

# Mutate Metafields
MUTATION = """
mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields {
      key
      value
    }
    userErrors {
      field
      message
    }
  }
}
"""

def sync_csv(filename):
    with open(filename, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            title = row.get('Product Title', '').strip()
            role = row.get('bcf_role', '').strip()
            stems = row.get('bcf_stems_per_bunch', '').strip()
            
            if not title or not role:
                continue

            print(f"Syncing: {title}...")

            # 1. Look up the product by title
            search_res = run_query(SEARCH_QUERY, {"titleQuery": f"title:'{title}'"})
            if not search_res or 'data' not in search_res:
                continue
                
            edges = search_res['data']['products']['edges']
            if not edges:
                print(f"  -> WARNING: Product not found in Shopify: '{title}'")
                continue
                
            product_id = edges[0]['node']['id']
            
            # 2. Build the metafield payloads
            metafields = []
            if role:
                metafields.append({
                    "ownerId": product_id,
                    "namespace": "custom",
                    "key": "bcf_role",
                    "type": "single_line_text_field",
                    "value": role
                })
            if stems:
                metafields.append({
                    "ownerId": product_id,
                    "namespace": "custom",
                    "key": "bcf_stems_per_bunch",
                    "type": "number_integer",
                    "value": stems
                })
                
            # 3. Push to Shopify
            mut_res = run_query(MUTATION, {"metafields": metafields})
            if mut_res and 'data' in mut_res and mut_res['data']['metafieldsSet']:
                errors = mut_res['data']['metafieldsSet']['userErrors']
                if errors:
                    print(f"  -> ERROR setting metafields: {errors}")
                else:
                    print(f"  -> Success: Set role='{role}', stems='{stems}'")
            else:
                print(f"  -> Failed to parse mutation response: {mut_res}")

if __name__ == "__main__":
    csv_file = "quote-builder-flower-metafields.csv"
    if not os.path.exists(csv_file):
        print(f"Error: {csv_file} not found.")
    else:
        sync_csv(csv_file)
        print("\nSync Complete!")
