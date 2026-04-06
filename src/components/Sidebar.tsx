import React from 'react';
import { LayoutDashboard, Terminal, BookOpen, Trophy, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ currentView, onViewChange }: { currentView: string, onViewChange: (view: string) => void }) {
  const navItems = [
    { id: 'dashboard', label: 'Roadmap', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'sandbox', label: 'Active Sandbox', icon: <Terminal className="w-5 h-5" /> },
    { id: 'modules', label: 'All Modules', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 bg-[#151515] border-r border-[#2a2a2a] h-screen flex flex-col sticky top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2 text-[#FAFAFA] font-mono font-bold text-xl tracking-tight">
          <span className="text-[#3B82F6]">Init</span>[0]
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-1">
        <div className="px-3 mb-2 text-xs font-semibold text-[#555555] uppercase tracking-wider">
          Main Menu
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentView === item.id
                ? 'bg-[#3B82F6]/10 text-[#3B82F6]'
                : 'text-[#A1A1AA] hover:bg-[#1c1c1c] hover:text-[#FAFAFA]'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* User Area */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#FAFAFA] font-bold text-sm">
            TK
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#FAFAFA]">Siswa TKJ</span>
            <span className="text-xs text-[#3B82F6]">1,250 pts</span>
          </div>
        </div>
        <div className="flex gap-1">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#1c1c1c] rounded-md transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium text-[#A1A1AA] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-md transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
