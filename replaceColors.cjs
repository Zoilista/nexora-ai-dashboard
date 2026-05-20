const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
         results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Dark mode replacements to semantic classes
  content = content.replace(/bg-\[\#050505\]/g, 'bg-bg-main');
  content = content.replace(/bg-\[\#111\]/g, 'bg-bg-panel');
  content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-bg-panel');
  content = content.replace(/text-white/g, 'text-text-main');
  content = content.replace(/text-zinc-400/g, 'text-text-muted');
  content = content.replace(/border-white\/10/g, 'border-border-main');
  content = content.replace(/border-white\/5/g, 'border-border-main');
  content = content.replace(/bg-white\/5/g, 'bg-bg-panel-hover');
  
  // Clean up Layout.jsx and TopBar.jsx overrides I did recently
  content = content.replace(/bg-zinc-50 dark:bg-bg-main/g, 'bg-bg-main');
  content = content.replace(/bg-zinc-100 dark:bg-bg-panel/g, 'bg-bg-panel');
  content = content.replace(/text-zinc-900 dark:text-text-main/g, 'text-text-main');
  content = content.replace(/text-zinc-500 dark:text-text-muted/g, 'text-text-muted');
  content = content.replace(/border-black\/5 dark:border-border-main/g, 'border-border-main');

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Replaced colors with semantic variables in all files.');
