import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp, X } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

export const FloatingControls: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showWaTooltip, setShowWaTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* WhatsApp Floating Chat Widget */}
      <div className="relative pointer-events-auto flex items-center gap-3">
        {/* Tooltip Bubble */}
        {showWaTooltip && (
          <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-emerald-500/40 text-slate-200 text-xs px-3.5 py-2 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold">Need a quick project quote? Chat now!</span>
            <button 
              onClick={() => setShowWaTooltip(false)}
              className="p-1 hover:text-white text-slate-400 ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <a
          href={`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(AGENCY_INFO.whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
          className="relative w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer group"
          title="Direct WhatsApp Chat"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-slate-950"></span>
          </span>
          <MessageSquare className="w-7 h-7 fill-slate-950 group-hover:rotate-12 transition-transform" />
        </a>
      </div>

      {/* Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
};
