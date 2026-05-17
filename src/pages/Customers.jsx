import React, { useState } from 'react';
import { Search, User, Phone, Mail, Star, ChevronRight, MessageSquare, Calendar, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const customers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 555 0101', totalVisits: 24, totalSpent: 3840, lastVisit: 'May 10, 2026', favoriteService: 'Signature Facial', tags: ['VIP', 'Regular'], rating: 5, aiNote: 'Usually books on Fridays. Prefers the deluxe package.' },
  { id: 2, name: 'Michael Chen', email: 'm.chen@email.com', phone: '+1 555 0182', totalVisits: 12, totalSpent: 1560, lastVisit: 'May 12, 2026', favoriteService: 'Deep Tissue Massage', tags: ['Regular'], rating: 4, aiNote: 'Sensitive to strong scents. Always asks for the same therapist.' },
  { id: 3, name: 'Emma Thompson', email: 'emma.t@email.com', phone: '+1 555 0243', totalVisits: 8, totalSpent: 720, lastVisit: 'May 8, 2026', favoriteService: 'Manicure & Pedicure', tags: ['New'], rating: 5, aiNote: 'Recently mentioned a bridal event coming up. Great upsell opportunity.' },
  { id: 4, name: 'Jessica Alba', email: 'j.alba@email.com', phone: '+1 555 0317', totalVisits: 5, totalSpent: 450, lastVisit: 'Apr 28, 2026', favoriteService: 'Laser Hair Removal', tags: ['At Risk'], rating: 3, aiNote: 'Has not visited in 3 weeks. Consider sending a re-engagement offer.' },
  { id: 5, name: 'David Park', email: 'd.park@email.com', phone: '+1 555 0421', totalVisits: 18, totalSpent: 2200, lastVisit: 'May 5, 2026', favoriteService: 'Signature Facial', tags: ['VIP'], rating: 5, aiNote: 'High-value customer. Birthday is next month — great opportunity for a special offer.' },
];

const tagColors = {
  'VIP': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Regular': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'New': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'At Risk': 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const Customers = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(customers[0]);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.favoriteService.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 animate-in fade-in duration-500">
      <div className="w-80 bg-[#111] border border-white/10 rounded-2xl flex flex-col overflow-hidden shrink-0 shadow-lg">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white text-lg">{t('customers.title')}</h2>
            <span className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded-md">{customers.length} {t('customers.total')}</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input type="text" placeholder={t('customers.search')} value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:bg-white/10 transition-all placeholder:text-zinc-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.map(customer => (
            <button key={customer.id} onClick={() => setSelected(customer)}
              className={`w-full p-3 rounded-xl text-left transition-all border ${selected.id === customer.id ? 'bg-purple-500/10 border-purple-500/20' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
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
                    <span key={tag} className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${tagColors[tag]}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto min-w-0">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center shrink-0 text-2xl font-bold text-white border border-white/10">
              {selected.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                {selected.tags.map(tag => (
                  <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagColors[tag]}`}>{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-400 flex-wrap">
                <span className="flex items-center gap-1"><Mail size={14} />{selected.email}</span>
                <span className="flex items-center gap-1"><Phone size={14} />{selected.phone}</span>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
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
    </div>
  );
};
