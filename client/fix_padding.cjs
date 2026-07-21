const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('/home/sneha/SpendSense/client/src/components', function(filePath) {
  if (filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Simple replacements for the specific page classes
    content = content.replace(/\.profile-page\s*\{\s*padding:\s*\d+px;?/g, '.profile-page { padding: 0;');
    content = content.replace(/\.ask-page\s*\{\s*padding:\s*\d+px;?/g, '.ask-page { padding: 0;');
    content = content.replace(/\.expense-page\s*\{\s*padding:\s*\d+px;?/g, '.expense-page { padding: 0;');
    content = content.replace(/\.goals-page\s*\{\s*padding:\s*\d+px;?/g, '.goals-page { padding: 0;');
    content = content.replace(/\.analysis-page\s*\{\s*padding:\s*\d+px;?/g, '.analysis-page { padding: 0;');
    content = content.replace(/\.history-page\s*\{\s*padding:\s*\d+px;?/g, '.history-page { padding: 0;');
    
    // Also remove the mobile overrides just in case, though mobile layout might want different padding
    // We'll leave mobile alone or set to 0 and let page-content handle mobile padding too.
    content = content.replace(/\.profile-page\s*\{\s*padding:\s*18px;?/g, '.profile-page { padding: 0;');
    content = content.replace(/\.ask-page\s*\{\s*padding:\s*18px;?/g, '.ask-page { padding: 0;');
    content = content.replace(/\.expense-page\s*\{\s*padding:\s*18px;?/g, '.expense-page { padding: 0;');
    content = content.replace(/\.goals-page\s*\{\s*padding:\s*18px;?/g, '.goals-page { padding: 0;');
    content = content.replace(/\.analysis-page\s*\{\s*padding:\s*18px;?/g, '.analysis-page { padding: 0;');
    content = content.replace(/\.history-page\s*\{\s*padding:\s*18px;?/g, '.history-page { padding: 0;');

    fs.writeFileSync(filePath, content);
  }
});
console.log("Paddings removed.");
