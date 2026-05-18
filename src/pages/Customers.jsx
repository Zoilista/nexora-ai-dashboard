import React, { useState, useEffect } from 'react';
import { Search, User, Phone, Mail, Star, ChevronRight, MessageSquare, Calendar, DollarSign, Sparkles, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBusiness } from '../context/BusinessContext';

const customerMetadata = [
  { id: 1, key: 'c1', email: 'sarah.j@email.com', phone: '+1 555 0101', totalVisits: 24, totalSpent: 3840, lastVisit: 'May 10, 2026', rating: 5, tags: ['vip', 'regular'] },
  { id: 2, key: 'c2', email: 'm.chen@email.com', phone: '+1 555 0182', totalVisits: 12, totalSpent: 1560, lastVisit: 'May 12, 2026', rating: 4, tags: ['regular'] },
  { id: 3, key: 'c3', email: 'emma.t@email.com', phone: '+1 555 0243', totalVisits: 8, totalSpent: 720, lastVisit: 'May 8, 2026', rating: 5, tags: ['new'] },
  { id: 4, key: 'c4', email: 'j.alba@email.com', phone: '+1 555 0317', totalVisits: 5, totalSpent: 450, lastVisit: 'Apr 28, 2026', rating: 3, tags: ['atRisk'] },
  { id: 5, key: 'c5', email: 'd.park@email.com', phone: '+1 555 0421', totalVisits: 18, totalSpent: 2200, lastVisit: 'May 5, 2026', rating: 5, tags: ['vip'] },
];

const tagColors = {
  'vip': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'regular': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'new': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'atRisk': 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const Customers = () => {
  const { t } = useTranslation();
  const { businessType } = useBusiness();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(1);
  const [showAIModal, setShowAIModal] = useState(false);

  // Generate dynamic localized customer profiles
  const customerList = customerMetadata.map(c => {
    const favKey = t(`customers.profiles.${c.key}.favorite`);
    // Ensure upsell array safety
    let rawUpsells = t(`customers.profiles.${c.key}.upsells`, { returnObjects: true });
    let upsells = Array.isArray(rawUpsells) ? rawUpsells : [];

    return {
      ...c,
      name: t(`customers.profiles.${c.key}.name`),
      favoriteService: t(`appointments.services.${businessType}.${favKey}`),
      aiNote: t(`customers.profiles.${c.key}.aiNote`),
      personality: t(`customers.profiles.${c.key}.personality`),
      analysis: t(`customers.profiles.${c.key}.analysis`),
      upsells: upsells,
      strategy: t(`customers.profiles.${c.key}.strategy`),
    };
  });

  const selected = customerList.find(c => c.id === selectedId) || customerList[0];

  const filtered = customerList.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.favoriteService.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 animate-in fade-in duration-500">
      {/* Sidebar List */}
      <div className="w-80 bg-[#111] border border-white/10 rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-lg">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white text-lg">{t('customers.title')}</h2>
            <span className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded-md">{customerList.length} {t('customers.total')}</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input type="text" placeholder={t('customers.search')} value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:bg-white/10 transition-all placeholder:text-zinc-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
          {filtered.map(customer => (
            <button key={customer.id} onClick={() => setSelectedId(customer.id)}
              className={`w-full p-3 rounded-xl text-left transition-all border ${selectedId === customer.id ? 'bg-purple-500/10 border-purple-500/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 flex items-center justify-center shrink-0 font-bold text-sm text-white">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate">{customer.name}</p>
                  <p className="text-xs text-zinc-500 truncate">{customer.favoriteService}</p>
                </div>
                <div className="shrink-0 flex flex-col gap-1">
                  {customer.tags.slice(0, 1).map(tag => (
                    <span key={tag} className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${tagColors[tag]}`}>
                      {t(`customers.tags.${tag}`)}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Details Panel */}
      <div className="flex-1 space-y-6 overflow-y-auto min-w-0 pr-1 no-scrollbar">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center shrink-0 text-2xl font-bold text-white border border-white/10">
              {selected.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                {selected.tags.map(tag => (
                  <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagColors[tag]}`}>
                    {t(`customers.tags.${tag}`)}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-400 flex-wrap">
                <span className="flex items-center gap-1"><Mail size={14} />{selected.email}</span>
                <span className="flex items-center gap-1"><Phone size={14} />{selected.phone}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0 items-center">
              <button 
                onClick={() => setShowAIModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all text-xs mr-2 shadow-md hover:shadow-purple-500/10"
              >
                <Sparkles size={14} className="animate-pulse" />
                <span>{t('customers.aiAnalysisBtn')}</span>
              </button>
              <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" title={t('customers.sendMessage')}><MessageSquare size={18} /></button>
              <button className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors" title={t('customers.bookAppointment')}><Calendar size={18} /></button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Calendar, label: t('customers.visits'), value: selected.totalVisits, color: 'text-purple-400' },
            { icon: DollarSign, label: t('customers.spent'), value: `$${selected.totalSpent.toLocaleString()}`, color: 'text-emerald-400' },
            { icon: Star, label: t('customers.lastVisit'), value: selected.lastVisit, color: 'text-yellow-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg">
              <div className={`${stat.color} mb-2`}><stat.icon size={20} /></div>
              <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400"><Star size={16} /></div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{t('customers.aiNote')}</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">{selected.aiNote}</p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-lg">
          <h3 className="text-sm font-bold text-white mb-4">{t('customers.favoriteService')}</h3>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div>
              <p className="text-sm font-bold text-white">{selected.favoriteService}</p>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < selected.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-600'} />
                ))}
              </div>
            </div>
            <ChevronRight size={18} className="text-zinc-500" />
          </div>
        </div>
      </div>
      
      {/* AI Analysis Report Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 text-left">
          <div className="bg-[#111] border border-white/10 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden">
             <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 animate-pulse">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('customers.aiAnalysisTitle')}</h3>
                </div>
                <button onClick={() => setShowAIModal(false)} className="text-zinc-500 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <X size={20} />
                </button>
             </div>
             
             <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
               {/* Client Name & Profile Tag */}
               <div className="flex items-center justify-between border-b border-white/5 pb-4">
                 <div>
                   <h4 className="text-lg font-bold text-white">{selected.name}</h4>
                   <p className="text-xs text-zinc-400 mt-0.5">{selected.email} • {selected.phone}</p>
                 </div>
                 <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-300">
                   {selected.personality}
                 </div>
               </div>

               {/* Detailed AI Analysis */}
               <div className="space-y-2">
                 <h5 className="text-xs font-bold uppercase tracking-wider text-purple-400">{t('customers.aiNote')}</h5>
                 <p className="text-sm text-zinc-300 bg-white/5 border border-white/5 p-4 rounded-xl leading-relaxed">
                   {selected.analysis}
                 </p>
               </div>

               {/* Upsells / Recommendations */}
               <div className="space-y-3">
                 <h5 className="text-xs font-bold uppercase tracking-wider text-purple-400">{t('customers.aiUpsells')}</h5>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   {selected.upsells.map((item, idx) => (
                     <div key={idx} className="flex items-center gap-2 p-3 bg-purple-500/5 border border-purple-500/10 rounded-xl">
                       <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                       <span className="text-xs font-semibold text-purple-200">{item}</span>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Communication Strategy */}
               <div className="space-y-2">
                 <h5 className="text-xs font-bold uppercase tracking-wider text-purple-400">{t('customers.aiStrategy')}</h5>
                 <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm text-zinc-300 leading-relaxed flex gap-3">
                   <div className="p-1 rounded-full bg-blue-500/10 text-blue-400 shrink-0 h-fit mt-0.5">
                     <Star size={14} />
                   </div>
                   <span>{selected.strategy}</span>
                 </div>
               </div>
             </div>

             <div className="p-6 border-t border-white/10 bg-[#0a0a0a] flex justify-end">
               <button onClick={() => setShowAIModal(false)} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-zinc-200 transition-colors">
                 {t('customers.close')}
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
