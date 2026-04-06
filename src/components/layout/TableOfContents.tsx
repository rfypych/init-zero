import React, { useEffect, useState } from 'react';
import { LKSModule } from '../../types';

export const TableOfContents = ({ module }: { module: LKSModule }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    const elements = document.querySelectorAll('h2[id]');
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [module]);

  if (!module || module.isPlaceholder) return null;

  return (
    <aside className="w-64 hidden xl:block flex-shrink-0">
      <div className="sticky top-8">
        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          On this page
        </h4>
        <nav className="flex flex-col gap-2 border-l border-zinc-800">
          {module.sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`text-sm py-1 pl-4 border-l -ml-[1px] transition-colors ${
                activeId === section.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {section.title}
            </a>
          ))}
          {module.quiz && (
            <a
              href="#quiz"
              className={`text-sm py-1 pl-4 border-l -ml-[1px] transition-colors ${
                activeId === 'quiz'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Assessment Test
            </a>
          )}
        </nav>
      </div>
    </aside>
  );
};
