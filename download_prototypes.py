import requests
import base64
import os

# GitHub API endpoint
owner = "CampuzanoCorporate"
repo = "websiteLaVozDeMiLinaje2026"
branch = "main"
folder = "Prototipos"

files = ["inicio.jpg", "Frame 7.jpg", "Frame 8.jpg", "Body.jpg", "Body-1.jpg"]

os.makedirs("Prototipos", exist_ok=True)

for filename in files:
    url = f"https://api.github.com/repos/{owner}/{repo}/contents/{folder}/{filename}?ref={branch}"
    
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            content = base64.b64decode(data['content'])
            
            filepath = os.path.join("Prototipos", filename)
            with open(filepath, 'wb') as f:
                f.write(content)
            
            file_size = len(content)
            print(f"✓ Downloaded {filename} ({file_size} bytes)")
        else:
            print(f"✗ Failed to download {filename}: {response.status_code}")
    except Exception as e:
        print(f"✗ Error downloading {filename}: {str(e)}")

print("\nFiles in Prototipos folder:")
for f in os.listdir("Prototipos"):
    size = os.path.getsize(os.path.join("Prototipos", f))
    print(f"  {f}: {size:,} bytes")
