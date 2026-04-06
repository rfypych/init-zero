import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CommandInjectionSandbox from './components/CommandInjectionSandbox';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-[#121212] text-[#A1A1AA] font-sans selection:bg-[#3B82F6]/30">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-[#2a2a2a] bg-[#121212]/80 backdrop-blur z-10 shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#555555]">Init[0]</span>
            <span className="text-[#555555]">/</span>
            <span className="text-[#FAFAFA] font-medium">
              {currentView === 'dashboard' ? 'Roadmap Masterplan' : 
               currentView === 'sandbox' ? 'Level 4: Command Injection' : 
               'Module View'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1c1c1c] border border-[#2a2a2a] rounded-full text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
              Server Connected
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {currentView === 'dashboard' && <Dashboard onNavigate={setCurrentView} />}
          {currentView === 'sandbox' && (
            <CommandInjectionSandbox onComplete={() => console.log('Module completed!')} />
          )}
          {currentView !== 'dashboard' && currentView !== 'sandbox' && (
            <div className="flex items-center justify-center h-full text-[#555555]">
              <p>Modul ini sedang dalam tahap pengembangan.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
