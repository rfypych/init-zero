import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-[100dvh] bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 relative">
      {/* Subtle Cyber Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 w-full min-w-0 z-10 relative">
        {/* Mobile Header Bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Init[0]</span>
        </div>

        <div className="max-w-7xl mx-auto flex gap-12 p-6 lg:p-12 justify-center">
          <Outlet key={location.pathname} />
        </div>
      </main>
    </div>
  );
};
