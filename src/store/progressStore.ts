import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedModules: Record<string, boolean>; // key: module.slug
  score: number;
  markModuleCompleted: (slug: string) => void;
  isModuleCompleted: (slug: string) => boolean;
  getCompletionPercentage: (totalModules: number) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedModules: {},
      score: 0,

      markModuleCompleted: (slug) => set((state) => {
        if (state.completedModules[slug]) return state; // Already completed
        return {
          completedModules: { ...state.completedModules, [slug]: true },
          score: state.score + 100, // 100 points per module
        };
      }),

      isModuleCompleted: (slug) => !!get().completedModules[slug],

      getCompletionPercentage: (totalModules) => {
        if (totalModules === 0) return 0;
        const completedCount = Object.keys(get().completedModules).length;
        return Math.round((completedCount / totalModules) * 100);
      }
    }),
    {
      name: 'init0-progress-storage', // name of the item in the storage (must be unique)
    }
  )
);
