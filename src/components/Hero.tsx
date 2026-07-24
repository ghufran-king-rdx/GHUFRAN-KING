import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Code, Sparkles, CheckCircle2, ShieldCheck, Zap, Star } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const typingWords = [
    "Website Development",
    "Digital Marketing",
    "E-Commerce Stores",
    "AI Business Automation",
    "SEO & Paid Google Ads",
    "Domains & Cloud Hosting"
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = typingWords[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText.length < word.length) {
        setCurrentText(word.substring(0, currentText.length + 1));
      } else if (!isDeleting && currentText.length === word.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && currentText.length > 0) {
        setCurrentText(word.substring(0, currentText.length - 1));
      } else if (isDeleting && currentText.length === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden min-h-screen flex items-center justify-center">
      
      {/* Animated Neon Background Grid & Radial Glow Orbs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
      
      {/* Top Left Blue Glow Orb */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
      
      {/* Bottom Right Purple Neon Glow Orb */}
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-purple-500/30 text-xs font-black text-purple-300 mb-8 backdrop-blur-md shadow-xl shadow-purple-950/30 animate-bounce">
          <Sparkles className="w-4 h-4 text-pink-400 animate-spin [animation-duration:4s]" />
          <span className="uppercase tracking-widest text-[10px] sm:text-xs">
            GHUFRAN KING DIGITAL &bull; OFFICIAL AGENCY PORTAL
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>

        {/* Main Hero Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 uppercase">
          Build Your <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-glow-purple">
            Digital Future
          </span>
        </h1>

        {/* Typing Effect Subhead Display */}
        <div className="h-10 sm:h-12 mb-6 flex items-center justify-center">
          <div className="text-lg sm:text-2xl font-black text-slate-300 font-mono flex items-center gap-2 bg-slate-900/70 border border-slate-800 px-4 sm:px-6 py-2 rounded-2xl shadow-inner">
            <span className="text-purple-400">&gt;</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-300">
              {currentText}
            </span>
            <span className="w-2 h-6 bg-pink-500 animate-pulse"></span>
          </div>
        </div>

        {/* Sub Heading Text */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-medium leading-relaxed mb-10">
          Professional Website Development, Digital Marketing, Hosting, Domains, AI Solutions &amp; Online Business Services.
        </p>

        {/* 3 Explicit Call To Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-16">
          {/* Button 1: Get Started */}
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:to-pink-500 text-white shadow-2xl shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Button 2: WhatsApp Now */}
          <a
            href={`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(AGENCY_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-300 shadow-xl shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>WhatsApp Now</span>
          </a>

          {/* Button 3: View Services */}
          <button
            onClick={() => onNavigate('services')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 text-slate-200 shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Code className="w-5 h-5 text-purple-400" />
            <span>View Services</span>
          </button>
        </div>

        {/* Floating Metrics / Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="glass-panel p-4 rounded-2xl text-left border border-slate-800/80">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-2xl font-black text-white">250+</span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Projects Delivered</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-left border border-slate-800/80">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span className="text-2xl font-black text-white">99%</span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Satisfaction Index</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-left border border-slate-800/80">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-2xl font-black text-white">99.99%</span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Server Uptime SLA</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-left border border-slate-800/80">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <CheckCircle2 className="w-4 h-4 text-pink-400" />
              <span className="text-2xl font-black text-white">24/7</span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Client Assistance</p>
          </div>
        </div>

      </div>
    </section>
  );
};
