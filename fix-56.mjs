import fs from 'fs';
let content = fs.readFileSync('src/data/modules/web/sql-injection.ts', 'utf8');
content = content.replace(/content: 'Apa jadinya jika hacker memasukkan `admin\\' OR \\'1\\'=\\'1` pada form username, dan membiarkan password kosong\?'/g,
"content: \"Apa jadinya jika hacker memasukkan `admin' OR '1'='1` pada form username, dan membiarkan password kosong?\"");
fs.writeFileSync('src/data/modules/web/sql-injection.ts', content);
