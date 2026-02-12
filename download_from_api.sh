#!/bin/bash

OWNER="CampuzanoCorporate"
REPO="websiteLaVozDeMiLinaje2026"
BRANCH="main"
FOLDER="Prototipos"

mkdir -p prototipos_downloaded

# Download each file using GitHub API
for file in "inicio.jpg" "Frame 7.jpg" "Frame 8.jpg" "Body.jpg" "Body-1.jpg"; do
    encoded_file=$(echo "$file" | sed 's/ /%20/g')
    url="https://api.github.com/repos/$OWNER/$REPO/contents/$FOLDER/$encoded_file?ref=$BRANCH"
    
    echo "Downloading $file..."
    response=$(curl -s "$url")
    
    # Check if we got content
    if echo "$response" | grep -q '"content"'; then
        # Extract and decode base64 content
        echo "$response" | python3 -c "
import sys, json, base64
try:
    data = json.load(sys.stdin)
    content = data.get('content', '').replace('\n', '')
    decoded = base64.b64decode(content)
    sys.stdout.buffer.write(decoded)
except Exception as e:
    print(f'Error: {e}', file=sys.stderr)
" > "prototipos_downloaded/$file"
        
        size=$(stat -f%z "prototipos_downloaded/$file" 2>/dev/null || stat -c%s "prototipos_downloaded/$file" 2>/dev/null)
        echo "  ✓ Saved ($size bytes)"
    else
        echo "  ✗ Failed - Response: $(echo "$response" | head -c 100)"
    fi
done

echo ""
echo "Files in prototipos_downloaded/:"
ls -lh prototipos_downloaded/
