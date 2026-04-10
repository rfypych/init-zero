import React, { useState, useEffect } from 'react';
import { Quiz } from '../../types';
import { CheckCircle2, XCircle, Trophy, Flag, Lock, Lightbulb, Terminal, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgressStore } from '../../store/progressStore';
import { useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { enhanceText } from '../../utils/highlight';

export const QuizSystem = ({ quiz }: { quiz: Quiz }) => {
  const { slug } = useParams<{ slug: string }>();
  const { markModuleCompleted, isModuleCompleted } = useProgressStore();
  const isAlreadyCompleted = slug ? isModuleCompleted(slug) : false;

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(isAlreadyCompleted);
  const [wasCorrect, setWasCorrect] = useState(isAlreadyCompleted);
  const [hintLevel, setHintLevel] = useState(0);

  // Sync state if navigating between already completed modules
  useEffect(() => {
    if (slug && isModuleCompleted(slug)) {
      setIsSubmitted(true);
      setWasCorrect(true);
      setHintLevel(0);
      // For visual feedback on already completed:
      if (quiz.type === 'flag_submission') {
         setFlagInput(quiz.flag);
      } else if (quiz.type === 'mcq') {
         const correctOpt = quiz.options.find(o => o.isCorrect);
         if (correctOpt) setSelectedOption(correctOpt.id);
      }
    } else {
      setIsSubmitted(false);
      setWasCorrect(false);
      setSelectedOption(null);
      setFlagInput('');
      setHintLevel(0);
    }
  }, [slug, quiz, isModuleCompleted]);

  const triggerWin = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#10B981', '#6366F1']
    });
  };

  const handleMCQSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true);
      const isCorrect = quiz.type === 'mcq' && quiz.options.find(o => o.id === selectedOption)?.isCorrect;
      setWasCorrect(!!isCorrect);
      if (isCorrect && slug) {
        markModuleCompleted(slug);
        if (!isAlreadyCompleted) triggerWin();
      }
    }
  };

  const handleFlagSubmit = () => {
    if (flagInput.trim() !== '') {
      setIsSubmitted(true);
      const isCorrect = quiz.type === 'flag_submission' && flagInput.trim() === quiz.flag;
      setWasCorrect(!!isCorrect);
      if (isCorrect && slug) {
        markModuleCompleted(slug);
        if (!isAlreadyCompleted) triggerWin();
      }
    }
  };

  if (quiz.type === 'log_analysis') {
    return null;
  }

  // Generate generic hints if none provided, but we strongly prefer explicit hints now
  const hints = quiz.hints && quiz.hints.length > 0
    ? quiz.hints
    : [
        "Gunakan simulator/lab interaktif yang ada di materi di atas.",
        "Eksploitasi kerentanannya sampai muncul teks 'FLAG: INIT0{...}'. Copy dan paste flag tersebut ke form ini."
      ];

  const totalHints = hints.length;

  return (
    <div className="mt-16 border-t border-zinc-800 pt-10" id="quiz">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold flex items-center gap-3 text-white">
          <div className={`p-2 rounded-lg ${isAlreadyCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
            <Trophy className="w-6 h-6" />
          </div>
          Mission Objective
        </h3>
        {isAlreadyCompleted && (
           <span className="text-xs font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 flex items-center gap-1">
             <CheckCircle2 className="w-3 h-3" /> COMPLETED
           </span>
        )}
      </div>

      <div className={`rounded-2xl p-8 border shadow-2xl relative overflow-hidden ${
        isAlreadyCompleted
          ? 'bg-zinc-900/40 border-emerald-500/20 shadow-emerald-500/5'
          : 'bg-zinc-900 border-zinc-800'
      }`}>
        {/* Decorative background glow */}
        {!isAlreadyCompleted && <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>}

        <p
          className="text-lg font-medium text-zinc-200 mb-8 leading-relaxed relative z-10"
          dangerouslySetInnerHTML={{ __html: enhanceText(quiz.question) }}
        />

        {quiz.type === 'mcq' && (
          <div className="space-y-4 relative z-10">
            {quiz.options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isSubmitted
                    ? option.isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-200'
                      : option.id === selectedOption
                        ? 'bg-red-500/10 border-red-500/50 text-red-200'
                        : 'border-zinc-800/50 opacity-40 grayscale'
                    : selectedOption === option.id
                      ? 'bg-blue-500/10 border-blue-500 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                      : 'bg-zinc-950/80 border-zinc-800/80 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900'
                }`}
              >
                <input
                  type="radio"
                  name="quiz"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => !isSubmitted && setSelectedOption(option.id)}
                  disabled={isSubmitted}
                  className="w-5 h-5 text-blue-500 bg-zinc-900 border-zinc-700 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <span
                  className="flex-1 text-[16px]"
                  dangerouslySetInnerHTML={{ __html: enhanceText(option.text) }}
                />
                {isSubmitted && option.isCorrect && <CheckCircle2 className="text-emerald-500 w-6 h-6 flex-shrink-0" />}
                {isSubmitted && !option.isCorrect && option.id === selectedOption && <XCircle className="text-red-500 w-6 h-6 flex-shrink-0" />}
              </label>
            ))}

            {!isSubmitted && (
              <button
                onClick={handleMCQSubmit}
                disabled={!selectedOption}
                className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:grayscale text-white font-bold py-4 rounded-xl transition-all shadow-lg text-lg"
              >
                Submit Analysis
              </button>
            )}
          </div>
        )}

        {quiz.type === 'flag_submission' && (
          <div className="space-y-6 relative z-10">
             <div className="flex flex-col sm:flex-row gap-4">
               <div className="flex-1 relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   {isAlreadyCompleted ? <Lock className="w-5 h-5 text-emerald-500" /> : <Flag className="w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />}
                 </div>
                 <input
                   type="text"
                   value={flagInput}
                   onChange={(e) => !isSubmitted && setFlagInput(e.target.value)}
                   disabled={isSubmitted}
                   placeholder="INIT0{...}"
                   className={`w-full bg-zinc-950 border-2 pl-12 pr-4 py-4 rounded-xl font-mono text-[16px] focus:outline-none transition-all shadow-inner ${
                     isSubmitted
                       ? wasCorrect ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/5' : 'border-red-500/50 text-red-400 bg-red-500/5'
                       : 'border-zinc-800 focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] text-zinc-200'
                   }`}
                 />
               </div>
               {!isSubmitted && (
                 <button
                   onClick={handleFlagSubmit}
                   disabled={!flagInput}
                   className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 disabled:grayscale text-white px-10 font-bold rounded-xl transition-all shadow-lg py-4 sm:py-0 whitespace-nowrap text-lg"
                 >
                   Capture Flag
                 </button>
               )}
             </div>

             {/* HINT SYSTEM FOR BEGINNERS */}
             {!isSubmitted && (
               <div className="pt-4 border-t border-zinc-800/50">
                 <div className="flex items-center justify-between mb-3">
                   <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                     <Lightbulb className="w-4 h-4 text-yellow-500" /> Tactical Intelligence (Hints)
                   </div>
                   <span className="text-xs text-zinc-500 font-mono">Revealed: {hintLevel} / {totalHints}</span>
                 </div>

                 <div className="space-y-3">
                   {hints.map((hint, index) => (
                     <div key={index} className={`p-4 rounded-xl border ${hintLevel > index ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-zinc-950/50 border-zinc-800'}`}>
                       {hintLevel > index ? (
                         <div className="text-[15px] text-yellow-100/90 leading-relaxed font-mono flex items-start gap-3">
                           <span className="text-yellow-500 font-bold">[{index + 1}]</span>
                           <span dangerouslySetInnerHTML={{ __html: enhanceText(hint) }} />
                         </div>
                       ) : hintLevel === index ? (
                         <button
                           onClick={() => setHintLevel(hintLevel + 1)}
                           className="w-full py-2 text-sm text-zinc-400 hover:text-yellow-400 font-medium transition-colors flex items-center justify-center gap-2"
                         >
                           <Eye className="w-4 h-4" /> Request Hint {index + 1}
                         </button>
                       ) : (
                         <div className="py-2 text-sm text-zinc-600 font-medium flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                           <Lock className="w-4 h-4" /> Hint {index + 1} Locked
                         </div>
                       )}
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>
        )}

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`mt-8 p-6 rounded-xl border ${
              wasCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <h4 className={`font-bold flex items-center gap-3 mb-3 text-xl ${
              wasCorrect ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {wasCorrect ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
              {wasCorrect ? 'Target Compromised! (Correct)' : 'Access Denied (Incorrect)'}
            </h4>
            {quiz.explanation && (
              <div className="mt-4 border-t border-zinc-800/50 pt-4">
                <span className="inline-flex items-center gap-1.5 font-bold text-zinc-500 uppercase text-xs tracking-wider mb-2">
                  <Terminal className="w-3.5 h-3.5" /> Debriefing Log
                </span>
                <p
                  className="text-[15px] text-zinc-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: enhanceText(quiz.explanation) }}
                />
              </div>
            )}
            {!wasCorrect && (
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setWasCorrect(false);
                  setSelectedOption(null);
                  setFlagInput('');
                }}
                className="mt-6 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-sm font-bold text-white rounded-lg transition-colors border border-zinc-700 w-full sm:w-auto"
              >
                Retry Mission
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
