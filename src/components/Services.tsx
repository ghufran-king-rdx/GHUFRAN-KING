import React, { useState } from 'react';
import { 
  Code, Layout, UserCheck, Building2, ShoppingCart, Globe2, Server, CloudUpload, 
  ShieldAlert, Search, TrendingUp, Facebook, Target, Share2, Youtube, Palette, 
  Sparkles, Video, Bot, MessageSquare, ArrowRight, CheckCircle2
} from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';
import { Service } from '../types';

interface ServicesProps {
  onSelectService: (service: Service) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All 20 Services' },
    { id: 'development', label: 'Web Development' },
    { id: 'hosting', label: 'Hosting & Domains' },
    { id: 'marketing', label: 'Digital Marketing & Ads' },
    { id: 'design', label: 'Design & Media' },
    { id: 'automation', label: 'AI & WhatsApp' }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'ShoppingCart': return <ShoppingCart className="w-5 h-5" />;
      case 'Globe2': return <Globe2 className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'CloudUpload': return <CloudUpload className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Facebook': return <Facebook className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Youtube': return <Youtube className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-slate-950">
      
      {/* Decorative Glows */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-black text-blue-300 uppercase tracking-widest mb-3">
            <Code className="w-4 h-4 text-blue-400" />
            <span>Complete Agency Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Our Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Services</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Explore our comprehensive suite of 20 specialized agency services engineered to launch, scale, and automate your digital enterprise.
          </p>
        </div>

        {/* Category Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 bg-slate-900/60 p-3 rounded-3xl border border-slate-800/80 backdrop-blur-md">
          
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-bold"
            />
          </div>

        </div>

        {/* Service Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-800/80 flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-md group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  
                  {service.popular && (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-black text-white uppercase tracking-wider shadow-md">
                      Featured
                    </span>
                  )}
                </div>

                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-1">
                  {service.categoryLabel}
                </span>

                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-purple-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
              </div>

              {/* Bottom Details & Learn More Action */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-4 text-xs">
                  <span className="text-slate-400 font-bold">Starting from:</span>
                  <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {service.pricingStarting}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-slate-900 border border-slate-700/80 hover:border-purple-500/60 hover:bg-purple-950/40 text-purple-300 transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-sm font-bold uppercase tracking-wider">No matching services found for &quot;{searchQuery}&quot;.</p>
          </div>
        )}

      </div>
    </section>
  );
};
