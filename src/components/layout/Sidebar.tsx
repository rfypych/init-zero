import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight, Shield, ShieldAlert, FileSearch, BookOpen, Terminal, Code2, Layers } from 'lucide-react';
import { syllabus } from '../../data/syllabus';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export const Sidebar = () => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'web-exploitation': true, // Open Web Exploitation by default
  });

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-800 h-screen sticky top-0 overflow-y-auto flex-shrink-0 custom-scrollbar">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-500" />
          Init[0]
        </h2>
        <p className="text-xs text-zinc-500 mt-1">Cyber Security Preparation</p>
      </div>

      <nav className="px-4 pb-12">
        {syllabus.map((category) => (
          <div key={category.id} className="mb-4">
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex items-center justify-between w-full p-2 text-sm font-semibold text-zinc-300 hover:text-white rounded-md hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-center gap-2">
                <CategoryIcon title={category.title} />
                <span>{category.title}</span>
              </div>
              {openCategories[category.id] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {openCategories[category.id] && (
              <div className="mt-1 ml-2 pl-4 border-l border-zinc-800 flex flex-col gap-1">
                {category.modules.map((module) => (
                  <NavLink
                    key={module.id}
                    to={`/learn/${module.slug}`}
                    className={({ isActive }) => cn(
                      "block px-2 py-1.5 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-blue-500/10 text-blue-400 font-medium"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                    )}
                  >
                    {module.title}
                    {module.isPlaceholder && (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-500">TODO</span>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
