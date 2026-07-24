import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle2, Sparkles, Map } from 'lucide-react';
import { AGENCY_INFO, SERVICES_DATA } from '../data/agencyData';
import { ContactFormData } from '../types';

interface ContactProps {
  preselectedService?: string;
  preselectedPlan?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedService, preselectedPlan }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    serviceRequested: preselectedService || preselectedPlan || 'Website Development',
    budget: '$300 - $1,000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceRequested: preselectedService }));
    } else if (preselectedPlan) {
      setFormData(prev => ({ ...prev, serviceRequested: `Pricing Plan: ${preselectedPlan}` }));
    }
  }, [preselectedService, preselectedPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceRequested: 'Website Development',
        budget: '$300 - $1,000',
        message: ''
      });
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950 border-t border-slate-800/80">
      
      {/* Background Decor */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-black text-emerald-300 uppercase tracking-widest mb-3">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Initiate Project Inquiry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">GHUFRAN KING DIGITAL</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Ready to turn your idea into a high-performance digital asset? Message our team directly or fill out the project scope form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Cards & Details + WhatsApp CTA */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick Chat Highlight */}
            <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/40 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-black text-white uppercase tracking-tight">Need Instant Response?</h4>
                  <p className="text-xs text-emerald-400 font-bold uppercase">24/7 WhatsApp Hotline Active</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                Chat directly with team lead <strong className="text-white">Ghufran King</strong> on WhatsApp for instant scope estimation and priority setup.
              </p>
              <a
                href={`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(AGENCY_INFO.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Launch WhatsApp Chat</span>
              </a>
            </div>

            {/* Direct Information Block */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Official Agency Email</span>
                  <a href={`mailto:${AGENCY_INFO.email}`} className="text-sm font-black text-white hover:text-purple-300 transition-colors">
                    {AGENCY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Phone Hotline / Call</span>
                  <p className="text-sm font-black text-white">{AGENCY_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Agency Location</span>
                  <p className="text-sm font-black text-white">{AGENCY_INFO.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Support Availability</span>
                  <p className="text-xs font-bold text-slate-300">{AGENCY_INFO.workingHours}</p>
                </div>
              </div>

            </div>

            {/* Google Map Placeholder */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800/80 p-2">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-2">
                <Map className="w-4 h-4 text-purple-400" />
                <span>Global HQ Location</span>
              </div>
              <div className="relative h-48 w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80">
                <iframe
                  title="Agency Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.4673629471186!2d67.0270!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUxJzM4LjUiTiA2N8KwMDEnMzcuMiJF!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                  className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all border-0"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Right Column: Project Email Form */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-2xl">
            
            <div className="mb-8">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Send Scope Inquiry</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Fill out the project fields and we will reach back within 2 hours.</p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">Inquiry Successfully Transmitted!</h4>
                <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-md mx-auto">
                  Thank you <strong className="text-white">{formData.name}</strong>. Our technical director will review your request for <span className="text-emerald-400 font-bold">{formData.serviceRequested}</span> and respond to <span className="text-purple-300 font-bold">{formData.email}</span> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-bold text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-bold text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +1 555 019 2831"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-bold text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      Primary Service Interest *
                    </label>
                    <select
                      value={formData.serviceRequested}
                      onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-bold text-white focus:outline-none focus:border-purple-500 transition-all"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.title} ({srv.pricingStarting})
                        </option>
                      ))}
                      <option value="Pricing Plan: Starter">Pricing Plan: Starter ($199/mo)</option>
                      <option value="Pricing Plan: Professional">Pricing Plan: Professional ($499/mo)</option>
                      <option value="Pricing Plan: Business">Pricing Plan: Business ($999/mo)</option>
                      <option value="Custom Enterprise Solution">Custom Enterprise Solution</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Estimated Budget Bracket
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['< $300', '$300 - $1,000', '$1,000+'].map((bud) => (
                      <button
                        key={bud}
                        type="button"
                        onClick={() => setFormData({ ...formData, budget: bud })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          formData.budget === bud
                            ? 'bg-purple-600/30 border border-purple-500 text-white'
                            : 'bg-slate-950 border border-slate-800 text-slate-400'
                        }`}
                      >
                        {bud}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Project Requirements / Scope Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project goals, preferred features, domain name, or marketing target..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-medium text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Project Message</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
