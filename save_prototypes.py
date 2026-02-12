import subprocess
import os
import sys

files = ["inicio.jpg", "Frame 7.jpg", "Frame 8.jpg", "Body.jpg", "Body-1.jpg"]
os.makedirs("prototipos_real", exist_ok=True)

print("Intentando obtener archivos desde main branch usando git...")

for filename in files:
    try:
        # Try to get file from origin/main if it exists
        cmd = f'git show refs/remotes/origin/main:Prototipos/{filename}'
        result = subprocess.run(cmd, shell=True, capture_output=True)
        
        if result.returncode == 0 and len(result.stdout) > 100:
            filepath = os.path.join("prototipos_real", filename)
            with open(filepath, 'wb') as f:
                f.write(result.stdout)
            size = len(result.stdout)
            print(f"✓ Saved {filename} ({size:,} bytes)")
        else:
            print(f"✗ Could not get {filename}: {result.stderr.decode()[:100]}")
    except Exception as e:
        print(f"✗ Error with {filename}: {str(e)}")

print("\nArchivos guardados en prototipos_real/:")
for f in os.listdir("prototipos_real"):
    size = os.path.getsize(os.path.join("prototipos_real", f))
    print(f"  {f}: {size:,} bytes")
