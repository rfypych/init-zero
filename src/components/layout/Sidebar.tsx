import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Shield, ShieldAlert, FileSearch, BookOpen, Terminal, Code2, Layers, CheckCircle2, Menu, X } from 'lucide-react';
import { syllabus } from '../../data/syllabus';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useProgressStore } from '../../store/progressStore';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CategoryIcon = ({ title }: { title: string }) => {
  if (title.includes('Infrastructure')) return <Shield className="w-4 h-4" />;
  if (title.includes('Web Exploit')) return <Code2 className="w-4 h-4" />;
  if (title.includes('Binary Exploit')) return <Terminal className="w-4 h-4" />;
  if (title.includes('Reverse')) return <Layers className="w-4 h-4" />;
  if (title.includes('Forensic')) return <FileSearch className="w-4 h-4" />;
  if (title.includes('SOC')) return <ShieldAlert className="w-4 h-4" />;
  return <BookOpen className="w-4 h-4" />;
};

export const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) => {
  const location = useLocation();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'web-exploitation': true,
  });

  const { isModuleCompleted, getCompletionPercentage, score } = useProgressStore();

  // Calculate total modules (excluding placeholders)
  const totalModules = syllabus.reduce((acc, cat) => acc + cat.modules.filter(m => !m.isPlaceholder).length, 0);
  const progressPct = getCompletionPercentage(totalModules);

  // Auto-open category based on current URL route
  useEffect(() => {
    syllabus.forEach(cat => {
      if (cat.modules.some(m => location.pathname.includes(m.slug))) {
        setOpenCategories(prev => ({ ...prev, [cat.id]: true }));
      }
    });
  }, [location.pathname]);

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-50 h-[100dvh] w-72 bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex-shrink-0 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-500" />
              Init[0]
            </h2>
            <p className="text-[11px] text-zinc-500 mt-1 uppercase tracking-widest font-semibold">LKS Nasional</p>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Global Progress Indicator */}
        <div className="px-6 pb-6 flex-shrink-0">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-zinc-400">YOUR PROGRESS</span>
              <span className="text-xs font-bold text-blue-400">{score} PTS</span>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-2 mb-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
            <div className="text-right text-[10px] text-zinc-500 font-mono">{progressPct}% COMPLETED</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-12">
          {syllabus.map((category) => (
            <div key={category.id} className="mb-4">
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center justify-between w-full p-2 text-sm font-semibold text-zinc-300 hover:text-white rounded-md hover:bg-zinc-900 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CategoryIcon title={category.title} />
                  <span className="text-left">{category.title}</span>
                </div>
                {openCategories[category.id] ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
              </button>

              {openCategories[category.id] && (
                <div className="mt-1 ml-2 pl-4 border-l border-zinc-800/50 flex flex-col gap-1">
                  {category.modules.map((module) => {
                    const completed = isModuleCompleted(module.slug);
                    return (
                      <NavLink
                        key={module.id}
                        to={`/learn/${module.slug}`}
                        onClick={() => { if (window.innerWidth < 1024) toggleSidebar(); }}
                        className={({ isActive }) => cn(
                          "group flex items-center justify-between px-2 py-1.5 text-sm rounded-md transition-colors",
                          isActive
                            ? "bg-blue-500/10 text-blue-400 font-medium"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                        )}
                      >
                        <span className="truncate pr-2">{module.title}</span>
                        {completed && (
                          <CheckCircle2 className={cn(
                            "w-3.5 h-3.5 flex-shrink-0",
                            location.pathname.includes(module.slug) ? "text-emerald-400" : "text-emerald-500/50 group-hover:text-emerald-400"
                          )} />
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};
