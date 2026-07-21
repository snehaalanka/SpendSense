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
    
    // Replace hardcoded primary colors
    content = content.replace(/#2563EB/gi, 'var(--primary)');
    content = content.replace(/#1D4ED8/gi, 'var(--primary-hover)');
    
    // Replace all pixel-based border radiuses with the variable
    content = content.replace(/border-radius:\s*[1-9][0-9]*px;/g, 'border-radius: var(--radius-lg);');
    
    // Replace box-shadows (ignoring those that are already variables or none)
    content = content.replace(/box-shadow:\s*0[^;var]+;/g, 'box-shadow: var(--shadow);');

    fs.writeFileSync(filePath, content);
  }
});
console.log("CSS files updated successfully.");
