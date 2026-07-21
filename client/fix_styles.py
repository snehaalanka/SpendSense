import os
import glob
import re

def process_css_files():
    css_files = glob.glob('/home/sneha/SpendSense/client/src/**/*.css', recursive=True)
    
    for file in css_files:
        with open(file, 'r') as f:
            content = f.read()
            
        # Colors
        content = re.sub(r'#2563EB', 'var(--primary)', content, flags=re.IGNORECASE)
        content = re.sub(r'#1D4ED8', 'var(--primary-hover)', content, flags=re.IGNORECASE)
        
        # Border radiuses
        content = re.sub(r'border-radius:\s*[1-9][0-9]*px;', 'border-radius: var(--radius-lg);', content)
        
        # Shadows (simple heuristic)
        content = re.sub(r'box-shadow:\s*0[^;]+;', 'box-shadow: var(--shadow);', content)
        
        with open(file, 'w') as f:
            f.write(content)

if __name__ == "__main__":
    process_css_files()
