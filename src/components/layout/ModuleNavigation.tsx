import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { syllabus } from '../../data/syllabus';

export const ModuleNavigation = ({ currentSlug }: { currentSlug: string }) => {
  // Flatten syllabus to a simple array of valid modules
  const flatModules = syllabus.reduce((acc, cat) => {
    return acc.concat(cat.modules.filter(m => !m.isPlaceholder));
  }, [] as typeof syllabus[0]['modules']);

  const currentIndex = flatModules.findIndex(m => m.slug === currentSlug);

  if (currentIndex === -1) return null;

  const prevModule = currentIndex > 0 ? flatModules[currentIndex - 1] : null;
  const nextModule = currentIndex < flatModules.length - 1 ? flatModules[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between">
      {prevModule ? (
        <Link
          to={`/learn/${prevModule.slug}`}
          className="flex-1 flex flex-col items-start p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-700 transition-all group"
        >
          <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Previous Module
          </span>
          <span className="text-sm font-medium text-zinc-300 group-hover:text-blue-400 transition-colors">
            {prevModule.title}
          </span>
        </Link>
      ) : <div className="flex-1" />}

      {nextModule ? (
        <Link
          to={`/learn/${nextModule.slug}`}
          className="flex-1 flex flex-col items-end text-right p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-700 transition-all group"
        >
          <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
            Next Module
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="text-sm font-medium text-zinc-300 group-hover:text-blue-400 transition-colors">
            {nextModule.title}
          </span>
        </Link>
      ) : <div className="flex-1" />}
    </div>
  );
};
