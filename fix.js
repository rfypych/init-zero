const fs = require('fs');

let file1 = fs.readFileSync('src/components/simulators/MockSQLiForm.tsx', 'utf8');
file1 = file1.replace(/INIT0\{SQLi_1s_n0t_d3ad\}/g, "INIT0{'SQLi_1s_n0t_d3ad'}"); // Or just escaping it if it thinks it's a JSX expression.
// Actually, in TSX, {SQLi_1s_n0t_d3ad} is treated as a variable. It should be `INIT0{'{\'}SQLi_1s_n0t_d3ad{\'}'}` or `INIT0&#123;SQLi_1s_n0t_d3ad&#125;`
fs.writeFileSync('src/components/simulators/MockSQLiForm.tsx', file1.replace(/INIT0\{SQLi_1s_n0t_d3ad\}/g, "INIT0{'{}SQLi_1s_n0t_d3ad{}'}").replace(/\{\{\}/g, "{").replace(/\{\}\}/g, "}"));
