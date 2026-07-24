import React from 'react';
import { X, Check, Clock, Shield, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { Service } from '../types';
import { AGENCY_INFO } from '../data/agencyData';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onSelectServiceForContact }) => {
  if (!service) return null;

  const waMessage = `Hello Ghufran King Digital! I would like to inquire about your "${service.title}" service starting at ${service.pricingStarting}. Please guide me on next steps.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-6 pr-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/20 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">
              {service.categoryLabel}
            </span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">{service.title}</h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6">
          {service.fullDescription}
        </p>

        {/* Price & Timeline Bar */}
        <div className="grid grid-cols-2 gap-4 bg-slate-950 border border-slate-800/80 rounded-2xl p-4 mb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Starting Price</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">{service.pricingStarting}</span>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Turnaround Time</span>
            <span className="text-sm font-black text-white flex items-center gap-1.5 mt-1">
              <Clock className="w-4 h-4 text-purple-400" />
              {service.timeline}
            </span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="mb-6">
          <h4 className="text-xs font-black uppercase tracking-wider text-purple-300 mb-3">Key Highlights &amp; Scope</h4>
          <ul className="space-y-2">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        <div className="mb-8">
          <h4 className="text-xs font-black uppercase tracking-wider text-blue-300 mb-3">Guaranteed Deliverables</h4>
          <div className="flex flex-wrap gap-2">
            {service.deliverables.map((deliv, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold">
                &bull; {deliv}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
          <a
            href={`https://wa.me/${AGENCY_INFO.whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Inquire on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              onSelectServiceForContact(service.title);
              onClose();
            }}
            className="w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request Quotation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
