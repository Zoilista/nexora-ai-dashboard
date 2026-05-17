import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, Area, AreaChart } from 'recharts';
import { Lightbulb, TrendingUp, Sparkles, AlertTriangle } from 'lucide-react';
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

export const Insights = () => {
  const { t } = useTranslation();
  const [chartPeriod, setChartPeriod] = useState('30');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
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
            <h3 className="text-lg font-bold text-white">Weekly Revenue</h3>
            <p className="text-sm text-zinc-400 mt-1">Daily income for the current week</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-emerald-400">$12,200</p>
            <p className="text-xs text-zinc-500">This week</p>
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
              <XAxis dataKey="day" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} dx={-10} tickFormatter={(v) => `$${(v/1000).toFixed(1)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                formatter={(v) => [`$${v}`, 'Revenue']}
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
           <select
             value={chartPeriod}
             onChange={(e) => setChartPeriod(e.target.value)}
             className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none cursor-pointer"
           >
             <option value="30">30 Days</option>
             <option value="90">90 Days</option>
           </select>
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
