// Utility to auto-highlight important cyber security terms

const termMap: Record<string, string> = {
  'SQL Injection': 'text-blue-400 font-bold bg-blue-400/10 px-1 rounded',
  'SQLi': 'text-blue-400 font-bold bg-blue-400/10 px-1 rounded',
  'XSS': 'text-emerald-400 font-bold bg-emerald-400/10 px-1 rounded',
  'Cross-Site Scripting': 'text-emerald-400 font-bold bg-emerald-400/10 px-1 rounded',
  'RCE': 'text-red-400 font-bold bg-red-400/10 px-1 rounded',
  'Remote Command Execution': 'text-red-400 font-bold bg-red-400/10 px-1 rounded',
  'Buffer Overflow': 'text-rose-400 font-bold bg-rose-400/10 px-1 rounded',
  'CSRF': 'text-amber-400 font-bold bg-amber-400/10 px-1 rounded',
  'IDOR': 'text-purple-400 font-bold bg-purple-400/10 px-1 rounded',
  'SSTI': 'text-fuchsia-400 font-bold bg-fuchsia-400/10 px-1 rounded',
  'JWT': 'text-cyan-400 font-bold bg-cyan-400/10 px-1 rounded',
  'CTF': 'text-yellow-400 font-bold bg-yellow-400/10 px-1 rounded',
  'Flag': 'text-green-400 font-bold bg-green-400/10 px-1 rounded',
  'Root': 'text-red-500 font-bold underline decoration-red-500/50',
  'Admin': 'text-red-400 font-bold',
};

export const enhanceText = (text: string): string => {
  let processed = text;

  // Basic markdown bold to HTML
  processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');

  // Basic markdown inline code to HTML
  processed = processed.replace(/`(.*?)`/g, '<code class="bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded text-[13px] font-mono border border-indigo-500/20">$1</code>');

  // Basic markdown italics to HTML
  // Note: this regex is simple and might catch weird things, but works for our curated data
  // Using a negative lookbehind/lookahead to avoid matching inside **
  processed = processed.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="text-zinc-300 italic">$1</em>');

  // Convert newlines to breaks
  processed = processed.replace(/\n/g, '<br/>');

  // Auto-highlight technical terms
  Object.entries(termMap).forEach(([term, classes]) => {
    // Regex matches the term only if it's a whole word and not already inside an HTML tag
    const regex = new RegExp(`\\b(${term})\\b(?![^<]*>)`, 'g'); // case sensitive for simplicity to avoid replacing inside lowercase class names
    processed = processed.replace(regex, `<span class="${classes}">$1</span>`);
  });

  return processed;
};
