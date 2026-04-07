import fs from 'fs';

let f1 = fs.readFileSync('src/components/simulators/MockSQLiForm.tsx', 'utf8');
f1 = f1.replace(/INIT0\{SQLi_1s_n0t_d3ad\}/g, "INIT0{'{}SQLi_1s_n0t_d3ad{}'}");
f1 = f1.replace(/\{'\{\}SQLi_1s_n0t_d3ad\{\}'\}/g, "{'SQLi_1s_n0t_d3ad'}"); // this would just render INIT0SQLi_1s_n0t_d3ad. We want INIT0{SQLi_1s_n0t_d3ad}
f1 = fs.readFileSync('src/components/simulators/MockSQLiForm.tsx', 'utf8');
f1 = f1.replace(/INIT0\{SQLi_1s_n0t_d3ad\}/g, "INIT0{\"{\" + \"SQLi_1s_n0t_d3ad\" + \"}\"}");
fs.writeFileSync('src/components/simulators/MockSQLiForm.tsx', f1);

let f2 = fs.readFileSync('src/components/simulators/MockLogAnalyzer.tsx', 'utf8');
f2 = f2.replace(/INIT0\{L0g_Hunt3r_M4st3r\}/g, "INIT0{\"{\" + \"L0g_Hunt3r_M4st3r\" + \"}\"}");
fs.writeFileSync('src/components/simulators/MockLogAnalyzer.tsx', f2);
