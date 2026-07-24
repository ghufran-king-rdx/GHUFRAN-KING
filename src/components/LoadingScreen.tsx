import React, { useState, useEffect } from 'react';
import { Radio, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onFinishLoading: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinishLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinishLoading, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onFinishLoading]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-white select-none">
      
      {/* Animated Brand Logo */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 p-[2px] shadow-2xl shadow-purple-500/30 animate-pulse">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Radio className="w-10 h-10 text-purple-400 animate-spin [animation-duration:8s]" />
          </div>
        </div>
        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-pink-400 animate-bounce" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-1 text-center">
        GHUFRAN KING <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">DIGITAL</span>
      </h1>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 text-center">
        Engineering Digital Future
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-[1px] shadow-inner mb-3">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
        Initializing Agency Hub... {Math.min(progress, 100)}%
      </span>

    </div>
  );
};
