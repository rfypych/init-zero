import fs from 'fs';

let content = fs.readFileSync('src/components/quiz/QuizSystem.tsx', 'utf8');
content = content.replace(/FLAG: INIT0\{...\}/g, "FLAG: INIT0{...}");
// Wait, TSX error is about {...} inside JSX text.
content = content.replace(/FLAG: INIT0\{\.\.\.\}/g, "FLAG: INIT0{'{...}'}");
fs.writeFileSync('src/components/quiz/QuizSystem.tsx', content);
