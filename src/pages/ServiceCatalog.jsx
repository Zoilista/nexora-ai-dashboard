import React, { useState } from 'react';
import { Plus, Trash2, Clock, Scissors, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const initialServices = [
  { id: 1, nameKey: 'services.items.facial', categoryKey: 'skinCare', duration: 60, price: 120, active: true },
  { id: 2, nameKey: 'services.items.massage', categoryKey: 'massage', duration: 90, price: 150, active: true },
  { id: 3, nameKey: 'services.items.nails', categoryKey: 'nails', duration: 90, price: 80, active: true },
  { id: 4, nameKey: 'services.items.laser', categoryKey: 'skinCare', duration: 45, price: 200, active: true },
  { id: 5, nameKey: 'services.items.hair', categoryKey: 'hair', duration: 180, price: 220, active: false },
];

export const ServiceCatalog = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState(initialServices);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'hair', duration: '', price: '' });
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);

  const categories = [
    { key: 'All', transKey: 'services.all' },
    { key: 'hair', transKey: 'services.categories.hair' },
    { key: 'skinCare', transKey: 'services.categories.skinCare' },
    { key: 'massage', transKey: 'services.categories.massage' },
    { key: 'nails', transKey: 'services.categories.nails' }
  ];

  const filtered = activeCategory === 'All' ? services : services.filter(s => s.categoryKey === activeCategory || s.category === activeCategory);

  const toggleActive = (id) => setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));

  const addService = () => {
    if (!form.name || !form.price) return;
    setServices([...services, { id: Date.now(), name: form.name, category: form.category, duration: Number(form.duration) || 60, price: Number(form.price), active: true }]);
    setForm({ name: '', category: 'hair', duration: '', price: '' });
    setShowModal(false);
  };

  const getServiceName = (service) => service.nameKey ? t(service.nameKey) : service.name;
  const getServiceCategory = (service) => service.categoryKey ? t(`services.categories.${service.categoryKey}`) : service.category;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-main mb-1">{t('services.title')}</h1>
          <p className="text-sm text-text-muted">{t('services.subtitle')}</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-white text-black font-bold py-2.5 px-5 rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2 text-sm shadow-lg">
          <Plus size={16} />{t('services.addService')}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${activeCategory === cat.key ? 'bg-purple-500/10 border-purple-500/30 text-text-main' : 'bg-bg-panel-hover border-transparent text-text-muted hover:text-text-main'}`}>
            {t(cat.transKey)}
          </button>
        ))}
      </div>

      <div className="bg-bg-panel border border-border-main rounded-2xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border-main">
          <span className="col-span-4 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('services.serviceName')}</span>
          <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('services.category')}</span>
          <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('services.duration')}</span>
          <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('services.price')}</span>
          <span className="col-span-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{t('services.status')}</span>
        </div>
        {filtered.map(service => (
          <div key={service.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-border-main last:border-0 hover:bg-bg-panel-hover transition-colors group">
            <div className="col-span-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0"><Scissors size={16} /></div>
              <span className="text-sm font-bold text-text-main">{getServiceName(service)}</span>
            </div>
            <div className="col-span-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-zinc-300 font-medium">
                {getServiceCategory(service)}
              </span>
            </div>
            <div className="col-span-2 flex items-center gap-1 text-sm text-text-muted">
              <Clock size={14} />{service.duration} {t('services.min')}
            </div>
            <div className="col-span-2 text-sm font-bold text-emerald-400">${service.price}</div>
            <div className="col-span-2 flex items-center justify-between">
              <button onClick={() => toggleActive(service.id)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${service.active ? 'bg-purple-600' : 'bg-zinc-700'}`}>
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${service.active ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
              <button className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-bg-panel border border-border-main w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-border-main flex items-center justify-between">
              <h3 className="text-lg font-bold text-text-main">{t('services.addService')}</h3>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-text-main transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 block">{t('services.serviceName')}</label>
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-bg-panel-hover border border-border-main rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder={t('services.namePlaceholder')} />
              </div>
              <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 block">{t('services.category')}</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
                    className="w-full bg-bg-panel-hover border border-border-main rounded-xl px-4 py-3 text-sm text-text-main flex items-center justify-between hover:bg-white/10 hover:border-purple-500/50 transition-all cursor-pointer shadow-md"
                  >
                    <span>{t(`services.categories.${form.category}`)}</span>
                    <ChevronDown size={18} className={`text-text-muted transition-transform duration-300 ${isCatDropdownOpen ? 'rotate-180 text-purple-400' : ''}`} />
                  </button>

                  {isCatDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsCatDropdownOpen(false)} />
                      <div className="absolute left-0 mt-2 w-full bg-[#161616] border border-border-main rounded-xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-1 space-y-1">
                          {[
                            { key: 'hair', label: t('services.categories.hair') },
                            { key: 'skinCare', label: t('services.categories.skinCare') },
                            { key: 'massage', label: t('services.categories.massage') },
                            { key: 'nails', label: t('services.categories.nails') }
                          ].map(c => (
                            <button
                              key={c.key}
                              type="button"
                              onClick={() => {
                                setForm({ ...form, category: c.key });
                                setIsCatDropdownOpen(false);
                              }}
                              className={`w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm text-left transition-all ${
                                form.category === c.key 
                                  ? 'bg-purple-600 text-text-main font-bold' 
                                  : 'text-zinc-300 hover:text-text-main hover:bg-bg-panel-hover'
                              }`}
                            >
                              <span>{c.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 block">{t('services.duration')}</label>
                  <input type="number" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})}
                    className="w-full bg-bg-panel-hover border border-border-main rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-purple-500 transition-colors" placeholder="60" />
                </div>
                <div>
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 block">{t('services.price')}</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                    className="w-full bg-bg-panel-hover border border-border-main rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-purple-500 transition-colors" placeholder="120" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border-main bg-bg-panel flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-zinc-300 hover:bg-bg-panel-hover transition-colors">{t('services.cancel')}</button>
              <button onClick={addService} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-purple-600 text-text-main hover:bg-purple-500 transition-colors">{t('services.confirm')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
