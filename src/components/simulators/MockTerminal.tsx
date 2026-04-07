import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play } from 'lucide-react';

interface MockTerminalProps {
  title?: string;
  expectedCommand: string;
  successOutput: string;
  errorOutput?: string;
  hint?: string;
  flag?: string;
}

export const MockTerminal: React.FC<MockTerminalProps> = ({
  title = "Terminal Emulator",
  expectedCommand,
  successOutput,
  errorOutput = "bash: command not found or invalid syntax",
  hint,
  flag
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{cmd: string, out: string}[]>([]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    let output = '';
    // Sangat sederhana: cek apakah input user MENGANDUNG expectedCommand
    if (input.toLowerCase().includes(expectedCommand.toLowerCase())) {
      output = successOutput + (flag ? `\n\nFLAG: ${flag}` : '');
    } else {
      output = errorOutput;
    }

    setHistory(prev => [...prev, { cmd: input, out: output }]);
    setInput('');
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden my-6 font-mono text-sm">
      <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center gap-2 text-zinc-400">
        <TerminalIcon className="w-4 h-4" />
        <span>{title}</span>
      </div>

      <div className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
        {history.map((entry, i) => (
          <div key={i} className="mb-4">
            <div className="flex gap-2 text-zinc-300">
              <span className="text-emerald-500">user@init0:~$</span>
              <span>{entry.cmd}</span>
            </div>
            <div className="text-zinc-400 whitespace-pre-wrap mt-1">
              {entry.out}
            </div>
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex gap-2 text-zinc-300">
          <span className="text-emerald-500">user@init0:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none"
            spellCheck="false"
            autoFocus
          />
        </form>
      </div>
      {hint && (
        <div className="bg-zinc-900/50 px-4 py-2 text-xs text-zinc-500 border-t border-zinc-800">
          Hint: {hint}
        </div>
      )}
    </div>
  );
};
