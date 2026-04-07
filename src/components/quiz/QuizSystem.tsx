import React, { useState } from 'react';
import { Quiz } from '../../types';
import { CheckCircle2, XCircle, Trophy, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

export const QuizSystem = ({ quiz }: { quiz: Quiz }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMCQSubmit = () => {
    if (selectedOption) setIsSubmitted(true);
  };

  const handleFlagSubmit = () => {
    if (flagInput.trim() !== '') setIsSubmitted(true);
  };

  const isCorrectMCQ = quiz.type === 'mcq' && quiz.options.find(o => o.id === selectedOption)?.isCorrect;
  const isCorrectFlag = quiz.type === 'flag_submission' && flagInput.trim() === quiz.flag;

  const isCorrect = quiz.type === 'mcq' ? isCorrectMCQ : (quiz.type === 'flag_submission' ? isCorrectFlag : false);

  if (quiz.type === 'log_analysis') {
    return null; // Log analysis is handled directly inside the simulator component for tighter integration
  }

  return (
    <div className="mt-12 border-t border-zinc-800 pt-8" id="quiz">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        Knowledge Check
      </h3>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <p className="text-lg font-medium text-zinc-200 mb-6">{quiz.question}</p>

        {quiz.type === 'mcq' && (
          <div className="space-y-3">
            {quiz.options.map((option) => (
              <label
                key={option.id}
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  isSubmitted
                    ? option.isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-100'
                      : option.id === selectedOption
                        ? 'bg-red-500/10 border-red-500/50 text-red-100'
                        : 'border-zinc-800 opacity-50'
                    : selectedOption === option.id
                      ? 'bg-blue-500/10 border-blue-500 text-blue-100'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <input
                  type="radio"
                  name="quiz"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => !isSubmitted && setSelectedOption(option.id)}
                  disabled={isSubmitted}
                  className="mt-1"
                />
                <span className="flex-1">{option.text}</span>
                {isSubmitted && option.isCorrect && <CheckCircle2 className="text-emerald-500 w-5 h-5" />}
                {isSubmitted && !option.isCorrect && option.id === selectedOption && <XCircle className="text-red-500 w-5 h-5" />}
              </label>
            ))}

            {!isSubmitted && (
              <button
                onClick={handleMCQSubmit}
                disabled={!selectedOption}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Check Answer
              </button>
            )}
          </div>
        )}

        {quiz.type === 'flag_submission' && (
          <div className="space-y-4">
             <div className="flex gap-3">
               <div className="flex-1 relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Flag className="w-5 h-5 text-zinc-500" />
                 </div>
                 <input
                   type="text"
                   value={flagInput}
                   onChange={(e) => !isSubmitted && setFlagInput(e.target.value)}
                   disabled={isSubmitted}
                   placeholder="INIT0{...}"
                   className={`w-full bg-zinc-950 border pl-10 pr-4 py-3 rounded-lg font-mono focus:outline-none transition-colors ${
                     isSubmitted
                       ? isCorrectFlag ? 'border-emerald-500 text-emerald-400' : 'border-red-500 text-red-400'
                       : 'border-zinc-700 focus:border-blue-500 text-zinc-200'
                   }`}
                 />
               </div>
               {!isSubmitted && (
                 <button
                   onClick={handleFlagSubmit}
                   disabled={!flagInput}
                   className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 font-medium rounded-lg transition-colors"
                 >
                   Submit Flag
                 </button>
               )}
             </div>
          </div>
        )}

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-lg border ${
              isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
            }`}
          >
            <h4 className={`font-bold flex items-center gap-2 mb-2 ${
              isCorrect ? 'text-emerald-400' : 'text-red-400'
            }`}>
              {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </h4>
            {quiz.explanation && (
              <p className="text-sm text-zinc-300 mt-2">{quiz.explanation}</p>
            )}
            {!isCorrect && (
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedOption(null);
                  setFlagInput('');
                }}
                className="mt-4 text-sm underline text-zinc-400 hover:text-white"
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
