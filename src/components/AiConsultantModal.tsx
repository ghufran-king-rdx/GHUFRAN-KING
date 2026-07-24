import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, MessageSquare, ArrowRight } from 'lucide-react';
import { AGENCY_INFO, SERVICES_DATA } from '../data/agencyData';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceTitle: string) => void;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({ isOpen, onClose, onSelectService }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I am the AI Digital Consultant for GHUFRAN KING DIGITAL. Tell me about your business or project idea, and I will recommend the perfect website development, marketing, domain, or AI automation package!"
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      let aiResponse = "";
      const lower = userText.toLowerCase();

      if (lower.includes('website') || lower.includes('web') || lower.includes('site') || lower.includes('app')) {
        aiResponse = "For custom website development, we offer 5 specialized options:\n1. Landing Pages (High conversion sales page, $149)\n2. Portfolio Website ($179)\n3. Business Website (Corporate multi-page, $399)\n4. E-Commerce Store (Online shop with cart & payments, $599)\n5. Full Web App ($299+)\n\nWhich type matches your goal best?";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('budget')) {
        aiResponse = "Our main packages are:\n• Starter Package: $199/mo (Perfect for new businesses & portfolios)\n• Professional Agency: $499/mo (Includes web + Meta/Google Ads + SEO)\n• Enterprise Business: $999/mo (Complete 360° web app + AI automation + video editing)\n\nWould you like a custom quote for your budget?";
      } else if (lower.includes('marketing') || lower.includes('ads') || lower.includes('facebook') || lower.includes('google') || lower.includes('seo')) {
        aiResponse = "We run high-ROI digital marketing campaigns including:\n• Facebook & Instagram Meta Pixel Ads\n• Google Search & Performance Max Ads\n• SEO Search Engine Ranking\n• Social Media Management & YouTube Growth\n\nWhat is your target audience or location?";
      } else if (lower.includes('ai') || lower.includes('whatsapp') || lower.includes('automation') || lower.includes('bot')) {
        aiResponse = "We specialize in AI Business Automation & WhatsApp Bots:\n• Custom AI Chatbots trained on your business data\n• Official WhatsApp Business API setup with automated welcomes & product catalogs\n• Auto-lead qualification workflows\n\nWould you like to integrate an AI bot on your website or WhatsApp?";
      } else {
        aiResponse = `Thank you for asking! At GHUFRAN KING DIGITAL, we provide end-to-end Website Development, SEO, Facebook & Google Ads, Web Hosting, Domain Registration, Graphic Design, Video Editing, and AI Automation.\n\nYou can chat directly with team lead Ghufran King on WhatsApp at ${AGENCY_INFO.phone} or book a service directly!`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col h-[600px] max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
                <span>AI Digital Business Advisor</span>
                <Sparkles className="w-4 h-4 text-pink-400" />
              </h3>
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Instant Service &amp; Quote Recommender</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin">
          {messages.map((msg, idx) => (
            <div 
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-slate-800 border border-purple-500/30 text-purple-400'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl text-xs font-medium leading-relaxed max-w-[80%] whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-slate-950 border border-slate-800 text-slate-200'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-purple-400 font-bold p-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>AI is analyzing your query...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Suggestions */}
        <div className="py-2 flex flex-wrap gap-1.5 border-t border-slate-800">
          {[
            "Which website option fits my business?",
            "How much does e-commerce cost?",
            "Can you help me run Facebook & Google Ads?",
            "What is AI WhatsApp Automation?"
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(prompt);
              }}
              className="text-[10px] font-bold text-slate-400 bg-slate-950 hover:text-white border border-slate-800 hover:border-purple-500 px-3 py-1.5 rounded-xl cursor-pointer truncate max-w-[240px]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-2 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything about your project..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
