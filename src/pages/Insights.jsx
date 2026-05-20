import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { Lightbulb, TrendingUp, Sparkles, AlertTriangle, Calendar, Target, X, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const barData = [
  { name: 'Instagram', reach: 4200, conversion: 2400 },
  { name: 'TikTok', reach: 3100, conversion: 1398 },
  { name: 'Google', reach: 5800, conversion: 3800 },
  { name: 'WhatsApp', reach: 2780, conversion: 2100 },
];

const lineData = [
  { day: 'Mon', revenue: 1200 },
  { day: 'Tue', revenue: 900 },
  { day: 'Wed', revenue: 1800 },
  { day: 'Thu', revenue: 1400 },
  { day: 'Fri', revenue: 2200 },
  { day: 'Sat', revenue: 2800 },
  { day: 'Sun', revenue: 1900 },
];

// Get ISO week number helper
const getWeekNumber = (d) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

const WeeklyBriefingCard = ({ onDismiss }) => {
  const { t } = useTranslation();
  return (
    <div className="relative bg-gradient-to-br from-[#1a0f2e] to-[#0d1a2e] border border-purple-500/30 rounded-2xl p-6 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-3 duration-500">
      {/* Background glow blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-white">{t('weeklyBriefing.title')}</h2>
              <p className="text-xs text-purple-300/70 mt-0.5">{t('weeklyBriefing.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="text-zinc-500 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* 3 briefing items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {[
            {
              icon: Calendar,
              color: 'text-blue-400',
              bg: 'bg-blue-500/10 border-blue-500/20',
              label: t('weeklyBriefing.peakDay'),
              value: t('weeklyBriefing.peakDayValue')
            },
            {
              icon: Target,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10 border-emerald-500/20',
              label: t('weeklyBriefing.opportunity'),
              value: t('weeklyBriefing.opportunityValue')
            },
            {
              icon: TrendingUp,
              color: 'text-purple-400',
              bg: 'bg-purple-500/10 border-purple-500/20',
              label: t('weeklyBriefing.forecast'),
              value: t('weeklyBriefing.forecastValue')
            },
          ].map((item, i) => (
            <div key={i} className={`p-4 rounded-xl border ${item.bg}`}>
              <div className={`${item.color} mb-2`}><item.icon size={18} /></div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">{item.label}</p>
              <p className="text-sm font-bold text-white leading-snug">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Dismiss */}
        <div className="flex justify-end">
          <button
            onClick={onDismiss}
            className="flex items-center gap-1.5 text-xs font-bold text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 px-4 py-2 rounded-xl transition-all"
          >
            {t('weeklyBriefing.dismiss')}
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};



export const Insights = () => {
  const { t } = useTranslation();
  const [chartPeriod, setChartPeriod] = useState('30');

  // Weekly Briefing Card — show once per week, dismiss stored in localStorage
  const currentWeek = `${new Date().getFullYear()}-W${getWeekNumber(new Date())}`;
  const [showBriefing, setShowBriefing] = useState(() => {
    return localStorage.getItem('nexora_briefing_week') !== currentWeek;
  });

  const handleDismissBriefing = () => {
    localStorage.setItem('nexora_briefing_week', currentWeek);
    setShowBriefing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Weekly Briefing Card */}
      {showBriefing && <WeeklyBriefingCard onDismiss={handleDismissBriefing} />}

      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
           <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">{t('insights.title')}</h1>
          <p className="text-sm text-zinc-400">{t('insights.subtitle')}</p>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-[#111] p-6 border-t-2 border-emerald-500 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                   <TrendingUp size={20} />
                 </div>
                 <h3 className="font-bold text-white text-lg">{t('insights.growth')}</h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {t('insights.growthDesc')}
              </p>
           </div>

           <div className="bg-[#111] p-6 border-t-2 border-orange-500 rounded-2xl shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400">
                     <AlertTriangle size={20} />
                   </div>
                   <h3 className="font-bold text-white text-lg">{t('insights.improvement')}</h3>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  {t('insights.improvementDesc')}
                </p>
              </div>
              <button className="w-full text-sm font-bold text-orange-400 bg-orange-500/10 py-2.5 rounded-lg hover:bg-orange-500/20 transition-colors">
                {t('insights.generateCampaign')}
              </button>
           </div>

           <div className="bg-[#111] p-6 border-t-2 border-blue-500 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                   <Lightbulb size={20} />
                 </div>
                 <h3 className="font-bold text-white text-lg">{t('insights.recommendation')}</h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {t('insights.recommendationDesc')}
              </p>
           </div>
      </div>

      {/* Weekly Revenue Line Chart */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold text-white">{t('insights.weeklyRevenue')}</h3>
            <p className="text-sm text-zinc-400 mt-1">{t('insights.weeklyRevenueSub')}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-emerald-400">$12,200</p>
            <p className="text-xs text-zinc-500">{t('insights.thisWeek')}</p>
          </div>
        </div>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(tick) => t(`days.${tick.toLowerCase()}`)} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} dx={-10} tickFormatter={(v) => `$${(v/1000).toFixed(1)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                labelFormatter={(label) => t(`days.${label.toLowerCase()}`)}
                formatter={(v) => [`$${v}`, t('insights.revenue')]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#colorRevenue)" dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel Performance Bar Chart */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl shadow-lg">
         <div className="flex justify-between items-center mb-6">
           <div>
             <h3 className="text-lg font-bold text-white">{t('insights.performance')}</h3>
             <p className="text-sm text-zinc-400 mt-1">{t('insights.performanceSub')}</p>
           </div>
           <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
             {[{ val: '30', label: '30 ' + t('insights.days') }, { val: '90', label: '90 ' + t('insights.days') }].map(opt => (
               <button
                 key={opt.val}
                 type="button"
                 onClick={() => setChartPeriod(opt.val)}
                 className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${chartPeriod === opt.val ? 'bg-white/15 text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
               >
                 {opt.label}
               </button>
             ))}
           </div>
         </div>

         <div style={{ height: 300 }}>
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.03)'}}
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                <Bar dataKey="reach" name={t('insights.reach')} fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="conversion" name={t('insights.conversions')} fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
           </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
};
