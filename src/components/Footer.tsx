import React, { useState } from 'react';
import { Radio, Facebook, Instagram, Linkedin, Twitter, Youtube, MessageSquare, ArrowUp, X, ShieldCheck, FileText } from 'lucide-react';
import { AGENCY_INFO, SERVICES_DATA } from '../data/agencyData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: Agency Branding */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-600 p-[1px] shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Radio className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="text-base font-black text-white uppercase tracking-tight">
                GHUFRAN KING <span className="text-purple-400">DIGITAL</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed font-medium max-w-sm">
              {AGENCY_INFO.subTagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a href={AGENCY_INFO.socials.facebook} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={AGENCY_INFO.socials.instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={AGENCY_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={AGENCY_INFO.socials.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={AGENCY_INFO.socials.youtube} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 font-bold">
              {['home', 'about', 'services', 'portfolio', 'pricing', 'testimonials', 'faq', 'contact'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => onNavigate(link)}
                    className="hover:text-purple-300 transition-colors uppercase text-[11px] cursor-pointer"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Top Services */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">Core Services</h4>
            <ul className="space-y-2.5 font-bold">
              {SERVICES_DATA.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <button 
                    onClick={() => onNavigate('services')}
                    className="hover:text-purple-300 transition-colors text-[11px] text-left cursor-pointer truncate max-w-[160px]"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Legal & Contact Summary */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4">Support &amp; Legal</h4>
            <ul className="space-y-2.5 font-bold mb-6">
              <li>
                <button onClick={() => setModalType('privacy')} className="hover:text-purple-300 transition-colors text-[11px] cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setModalType('terms')} className="hover:text-purple-300 transition-colors text-[11px] cursor-pointer">
                  Terms of Service
                </button>
              </li>
            </ul>

            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
              <span className="text-[9px] font-black uppercase text-purple-400 block mb-1">Direct Hotline</span>
              <p className="text-white font-bold">{AGENCY_INFO.email}</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold">
          <p>© {new Date().getFullYear()} GHUFRAN KING DIGITAL. All Rights Reserved.</p>
          <p className="text-slate-500">Designed with React, Tailwind CSS &amp; Motion Animation.</p>
        </div>

      </div>

      {/* Legal Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            <button 
              onClick={() => setModalType(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              {modalType === 'privacy' ? <ShieldCheck className="w-6 h-6 text-purple-400" /> : <FileText className="w-6 h-6 text-blue-400" />}
              <h3 className="text-xl font-black uppercase tracking-tight">
                {modalType === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
            </div>

            <div className="text-xs text-slate-300 space-y-3 max-h-80 overflow-y-auto leading-relaxed pr-2 scrollbar-thin">
              {modalType === 'privacy' ? (
                <>
                  <p>At GHUFRAN KING DIGITAL, your privacy is paramount. We collect basic contact details strictly to process project inquiries and service requests.</p>
                  <p>We do not sell, rent, or share client data with third-party advertisers. All source code and credentials provided during development remain strictly confidential under NDA standards.</p>
                  <p>Website analytics are tracked anonymously to improve core performance and web vitals.</p>
                </>
              ) : (
                <>
                  <p>All digital development and marketing services provided by GHUFRAN KING DIGITAL are governed by signed scope agreements and deliverable checklists.</p>
                  <p>Clients retain 100% full master ownership of source code, graphics, and domain assets upon final payment settlement.</p>
                  <p>Maintenance retainers guarantee SLA response times and weekly system backups as detailed in chosen plans.</p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-right">
              <button
                onClick={() => setModalType(null)}
                className="px-6 py-2 rounded-xl bg-purple-600 text-white font-black uppercase text-xs"
              >
                Understood &amp; Accept
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
