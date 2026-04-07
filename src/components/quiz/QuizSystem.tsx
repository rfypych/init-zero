import React, { useState, useEffect } from 'react';
import { Quiz } from '../../types';
import { CheckCircle2, XCircle, Trophy, Flag, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProgressStore } from '../../store/progressStore';
import { useParams } from 'react-router-dom';

export const QuizSystem = ({ quiz }: { quiz: Quiz }) => {
  const { slug } = useParams<{ slug: string }>();
  const { markModuleCompleted, isModuleCompleted } = useProgressStore();
  const isAlreadyCompleted = slug ? isModuleCompleted(slug) : false;

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(isAlreadyCompleted);
  const [wasCorrect, setWasCorrect] = useState(isAlreadyCompleted);

  // Sync state if navigating between already completed modules
  useEffect(() => {
    if (slug && isModuleCompleted(slug)) {
      setIsSubmitted(true);
      setWasCorrect(true);
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
    }
  }, [slug, quiz, isModuleCompleted]);


  const handleMCQSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true);
      const isCorrect = quiz.type === 'mcq' && quiz.options.find(o => o.id === selectedOption)?.isCorrect;
      setWasCorrect(!!isCorrect);
      if (isCorrect && slug) {
        markModuleCompleted(slug);
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
      }
    }
  };

  if (quiz.type === 'log_analysis') {
    return null; // Handled by simulator directly
  }

  return (
    <div className="mt-16 border-t border-zinc-800 pt-10" id="quiz">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Trophy className={`w-5 h-5 ${isAlreadyCompleted ? 'text-emerald-500' : 'text-yellow-500'}`} />
          Assessment Test
        </h3>
        {isAlreadyCompleted && (
           <span className="text-xs font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 flex items-center gap-1">
             <CheckCircle2 className="w-3 h-3" /> COMPLETED
           </span>
        )}
      </div>

      <div className={`rounded-xl p-8 border shadow-lg ${
        isAlreadyCompleted
          ? 'bg-zinc-900/40 border-emerald-500/20 shadow-emerald-500/5'
          : 'bg-zinc-900/80 border-zinc-800'
      }`}>
        <p className="text-lg font-medium text-zinc-200 mb-6 leading-relaxed">{quiz.question}</p>

        {quiz.type === 'mcq' && (
          <div className="space-y-3">
            {quiz.options.map((option) => (
              <label
                key={option.id}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isSubmitted
                    ? option.isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-200'
                      : option.id === selectedOption
                        ? 'bg-red-500/10 border-red-500/50 text-red-200'
                        : 'border-zinc-800/50 opacity-40 grayscale'
                    : selectedOption === option.id
                      ? 'bg-blue-500/10 border-blue-500 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                      : 'bg-zinc-950/50 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                <div className="pt-0.5">
                  <input
                    type="radio"
                    name="quiz"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => !isSubmitted && setSelectedOption(option.id)}
                    disabled={isSubmitted}
                    className="w-4 h-4 text-blue-500 bg-zinc-900 border-zinc-700 focus:ring-blue-500 focus:ring-2"
                  />
                </div>
                <span className="flex-1 text-[15px]">{option.text}</span>
                {isSubmitted && option.isCorrect && <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0" />}
                {isSubmitted && !option.isCorrect && option.id === selectedOption && <XCircle className="text-red-500 w-5 h-5 flex-shrink-0" />}
              </label>
            ))}

            {!isSubmitted && (
              <button
                onClick={handleMCQSubmit}
                disabled={!selectedOption}
                className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:grayscale text-white font-bold py-3.5 rounded-xl transition-all shadow-lg"
              >
                Check Answer
              </button>
            )}
          </div>
        )}

        {quiz.type === 'flag_submission' && (
          <div className="space-y-4">
             <div className="flex flex-col sm:flex-row gap-3">
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
                   className={`w-full bg-zinc-950/80 border pl-12 pr-4 py-4 rounded-xl font-mono text-[15px] focus:outline-none transition-all shadow-inner ${
                     isSubmitted
                       ? wasCorrect ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/5' : 'border-red-500/50 text-red-400 bg-red-500/5'
                       : 'border-zinc-700 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.15)] text-zinc-200'
                   }`}
                 />
               </div>
               {!isSubmitted && (
                 <button
                   onClick={handleFlagSubmit}
                   disabled={!flagInput}
                   className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 disabled:grayscale text-white px-8 font-bold rounded-xl transition-all shadow-lg py-4 sm:py-0 whitespace-nowrap"
                 >
                   Submit Flag
                 </button>
               )}
             </div>
          </div>
        )}

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`mt-6 p-5 rounded-xl border ${
              wasCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <h4 className={`font-bold flex items-center gap-2.5 mb-2 text-lg ${
              wasCorrect ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {wasCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              {wasCorrect ? 'Target Compromised! (Correct)' : 'Access Denied (Incorrect)'}
            </h4>
            {quiz.explanation && (
              <p className="text-[15px] text-zinc-300 mt-3 leading-relaxed border-t border-zinc-800/50 pt-3">
                <span className="font-semibold text-zinc-400 uppercase text-xs tracking-wider block mb-1">Debriefing</span>
                {quiz.explanation}
              </p>
            )}
            {!wasCorrect && (
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setWasCorrect(false);
                  setSelectedOption(null);
                  setFlagInput('');
                }}
                className="mt-5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm font-medium text-white rounded-lg transition-colors border border-zinc-700"
              >
                Try Again
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
