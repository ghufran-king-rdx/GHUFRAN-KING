import React, { useState } from 'react';
import { Check, X, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { PRICING_DATA } from '../data/agencyData';

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-800/80">
      
      {/* Background Neon Orbs */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-black text-pink-300 uppercase tracking-widest mb-3">
            <Zap className="w-4 h-4 text-pink-400" />
            <span>Transparent Agency Investment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Pricing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Packages</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Straightforward pricing with zero surprise charges. Select your ideal tier or request a custom enterprise quote.
          </p>

          {/* Billing Toggle (Monthly / Yearly) */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                !isYearly ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                isYearly ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Plan</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-black text-[9px] uppercase">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (Starter, Professional, Business) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_DATA.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;

            return (
              <div 
                key={plan.id}
                className={`glass-panel p-8 rounded-3xl border flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular 
                    ? 'border-purple-500/80 bg-slate-900/80 shadow-2xl shadow-purple-950/40 lg:-translate-y-3' 
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-[10px] font-black text-white uppercase tracking-widest shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">{plan.description}</p>

                  {/* Price display */}
                  <div className="mb-8 pb-6 border-b border-slate-800/80">
                    <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">{price}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">
                      {isYearly ? '/ month (billed yearly)' : '/ month'}
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 block mb-3">Included Services &amp; Perks</span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-medium">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}

                    {plan.notIncluded && plan.notIncluded.map((notFeat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-slate-600 font-medium line-through">
                        <X className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                        <span>{notFeat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-900 border border-slate-700 hover:border-purple-500 text-white'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
