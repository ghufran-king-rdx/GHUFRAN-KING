import React from 'react';
import { Target, Eye, Award, CheckCircle, ShieldCheck, Zap, HeartHandshake, Clock, Sparkles } from 'lucide-react';
import { AGENCY_INFO, COMPANY_VALUES } from '../data/agencyData';

export const About: React.FC = () => {
  const differentiators = [
    {
      title: "100% Custom Craftsmanship",
      desc: "No lazy cookie-cutter templates. Every line of code, pixel, and ad copy is bespoke for your target market.",
      icon: Sparkles
    },
    {
      title: "24/7 Dedicated Support",
      desc: "Direct access via WhatsApp and Email with guaranteed emergency technical response times.",
      icon: Clock
    },
    {
      title: "Transparent & Fair Pricing",
      desc: "Zero hidden costs or sudden renewal surges. Complete clarity on deliverables and source code ownership.",
      icon: HeartHandshake
    },
    {
      title: "Bulletproof Security & Speed",
      desc: "Enterprise SSL, Cloudflare anti-DDoS, and Core Web Vitals optimization built standard into every deploy.",
      icon: ShieldCheck
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-slate-800/80">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-black text-purple-300 uppercase tracking-widest mb-3">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Who We Are</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">GHUFRAN KING DIGITAL</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            A full-service digital transformation agency engineering world-class web applications, high-ROI marketing funnels, and automated business ecosystems.
          </p>
        </div>

        {/* Company Intro & Visual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left Text Column */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Driving Digital Excellence <br />
              <span className="text-purple-400">For Modern Businesses Worldwide</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded under the leadership of <strong className="text-white font-bold">Ghufran King</strong>, our team combines elite full-stack engineering, conversion psychology, and artificial intelligence to elevate brands above competitors.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Whether you need a sleek corporate web application, high-speed cloud hosting, laser-targeted Facebook &amp; Google ad campaigns, or automated AI WhatsApp bots, we deliver turnkey solutions tailored for growth.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">5+ Years</span>
                <p className="text-xs text-slate-400 font-bold uppercase mt-1">Industry Mastery</p>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">100%</span>
                <p className="text-xs text-slate-400 font-bold uppercase mt-1">Project Delivery Rate</p>
              </div>
            </div>
          </div>

          {/* Right Cards: Mission & Vision */}
          <div className="space-y-6">
            {COMPANY_VALUES.map((val, idx) => (
              <div 
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-800/80 relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-500/20">
                    {idx === 0 ? <Target className="w-6 h-6" /> : idx === 1 ? <Eye className="w-6 h-6" /> : <Award className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">{val.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">{val.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Why Choose Us Grid */}
        <div className="pt-10">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Why Leading Brands Choose Us</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Built for speed, security, and sales</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((diff, idx) => {
              const IconComp = diff.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/40 p-6 rounded-2xl backdrop-blur-md transition-all hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-black text-white uppercase tracking-tight mb-2">{diff.title}</h4>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{diff.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
