const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('/home/sneha/SpendSense/client/src', function(filePath) {
  if (filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Use regex to find elements with background: var(--card) or background: var(--sidebar)
    // and append backdrop-filter to them
    
    // A bit tricky with regex. Let's just find "background: var(--card);" and append backdrop-filter
    if(content.includes('background: var(--card);') && !content.includes('backdrop-filter')) {
       content = content.replace(/background:\s*var\(--card\);/g, 'background: var(--card);\n    backdrop-filter: var(--glass-blur);\n    -webkit-backdrop-filter: var(--glass-blur);');
    }
    
    if(content.includes('background: var(--sidebar);') && !content.includes('backdrop-filter')) {
       content = content.replace(/background:\s*var\(--sidebar\);/g, 'background: var(--sidebar);\n    backdrop-filter: var(--glass-blur);\n    -webkit-backdrop-filter: var(--glass-blur);');
    }

    fs.writeFileSync(filePath, content);
  }
});
console.log("Glassmorphism added.");
