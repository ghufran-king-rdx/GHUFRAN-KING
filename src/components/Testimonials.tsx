import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/agencyData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-slate-950/90 border-t border-slate-800/80">
      
      {/* Background Decor */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-black text-purple-300 uppercase tracking-widest mb-3">
            <Quote className="w-4 h-4 text-purple-400" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Clients Say</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Read authentic reviews from business executives, marketing leads, and founders who trusted GHUFRAN KING DIGITAL.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div 
              key={item.id}
              className="glass-panel p-8 rounded-3xl border border-slate-800/80 hover:border-purple-500/40 transition-all flex flex-col justify-between relative"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-6 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-200 font-medium leading-relaxed mb-6 italic">
                  &quot;{item.content}&quot;
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center gap-4">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-2xl object-cover border border-purple-500/30 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{item.role} &bull; {item.company}</p>
                  <span className="inline-block text-[9px] font-black text-purple-400 uppercase tracking-widest mt-1">
                    Service: {item.serviceUsed}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
