import React, { useState } from 'react';
import { ExternalLink, Layers, Sparkles, X, CheckCircle2, TrendingUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/agencyData';
import { PortfolioItem } from '../types';

export const Portfolio: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filterCategories = ['All', 'Website', 'E-commerce', 'Digital Marketing', 'AI Solutions'];

  const filteredItems = PORTFOLIO_DATA.filter((item) => {
    if (selectedTag === 'All') return true;
    return item.category === selectedTag;
  });

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-slate-950/80 border-t border-slate-800/80">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-black text-purple-300 uppercase tracking-widest mb-3">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Showcase &amp; Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Portfolio</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            Explore real client success stories, enterprise web deployments, and high-conversion marketing funnels delivered by our team.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTag(cat)}
              className={`px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedTag === cat
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20 scale-105'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group glass-panel rounded-3xl overflow-hidden border border-slate-800/80 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                {/* Top Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-black uppercase tracking-wider text-purple-300">
                  {item.category}
                </span>

                {/* Bottom Metric Tag */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-400 bg-slate-950/90 border border-emerald-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-lg">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {item.results}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                  Client: {item.client}
                </span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mb-4 font-medium leading-relaxed">
                  {item.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
            
            <button 
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 block mb-1">
              {activeItem.category} Case Study
            </span>
            <h3 className="text-2xl font-black text-white uppercase mb-2">{activeItem.title}</h3>
            <p className="text-xs text-slate-400 font-bold uppercase mb-4">Client: {activeItem.client}</p>

            <img 
              src={activeItem.thumbnail} 
              alt={activeItem.title} 
              className="w-full h-64 object-cover rounded-2xl mb-6 border border-slate-800"
            />

            <p className="text-sm text-slate-300 font-medium leading-relaxed mb-6">
              {activeItem.description}
            </p>

            <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 mb-6">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Proven Business Outcome</span>
              <span className="text-lg font-black text-emerald-400 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                {activeItem.results}
              </span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black uppercase tracking-wider text-xs"
              >
                Close Project
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
