import React, { useState } from 'react';
import { Sparkles, TrendingUp, Eye, MousePointerClick, CheckCircle2, Clock, BarChart2, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const campaignHistory = [
  { id: 1, transKey: 'c1', platform: 'Instagram', statusKey: 'published', reach: 4820, clicks: 312, conversions: 48, aiScoreKey: 'aboveAverage' },
  { id: 2, transKey: 'c2', platform: 'WhatsApp', statusKey: 'published', reach: 1240, clicks: 180, conversions: 22, aiScoreKey: 'excellent' },
  { id: 3, transKey: 'c3', platform: 'Facebook', statusKey: 'scheduled', reach: null, clicks: null, conversions: null, aiScoreKey: null },
];

const statusColors = {
  published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  draft: 'bg-zinc-500/10 text-text-muted border-zinc-500/30',
};

const scoreColors = {
  excellent: 'text-emerald-400',
  aboveAverage: 'text-blue-400',
  average: 'text-yellow-400'
};

export const CampaignResults = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(campaignHistory[0]);

  const getCampaignTitle = (c) => t(`campaignResults.history.${c.transKey}.title`);
  const getCampaignDate = (c) => t(`campaignResults.history.${c.transKey}.date`);
  const getCampaignAiNote = (c) => t(`campaignResults.history.${c.transKey}.aiNote`);
  const getCampaignStatus = (c) => t(`campaignResults.statuses.${c.statusKey}`);
  const getCampaignScore = (c) => c.aiScoreKey ? t(`campaignResults.scores.${c.aiScoreKey}`) : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-main mb-1">{t('campaignResults.title')}</h1>
          <p className="text-sm text-text-muted">{t('campaignResults.subtitle')}</p>
        </div>
        <Link to="/campaigns" className="bg-white text-black font-bold py-2.5 px-5 rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2 text-sm shadow-lg">
          <Plus size={16} />{t('campaignResults.newCampaign')}
        </Link>
      </div>

      <div className="flex gap-6">
        <div className="w-72 space-y-2 shrink-0">
          {campaignHistory.map(campaign => (
            <button key={campaign.id} onClick={() => setSelected(campaign)}
              className={`w-full p-4 rounded-2xl text-left border transition-all ${selected.id === campaign.id ? 'bg-purple-500/10 border-purple-500/20' : 'bg-bg-panel border-border-main hover:bg-bg-panel-hover'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-zinc-500 font-semibold">{campaign.platform}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors[campaign.statusKey]}`}>{getCampaignStatus(campaign)}</span>
              </div>
              <p className="text-sm font-bold text-text-main mb-1 leading-snug">{getCampaignTitle(campaign)}</p>
              <p className="text-xs text-zinc-500">{getCampaignDate(campaign)}</p>
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-5 min-w-0">
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Eye, label: t('campaignResults.reach'), value: selected.reach ? selected.reach.toLocaleString() : '—', color: 'text-blue-400' },
              { icon: MousePointerClick, label: t('campaignResults.clicks'), value: selected.clicks ? selected.clicks.toLocaleString() : '—', color: 'text-purple-400' },
              { icon: CheckCircle2, label: t('campaignResults.conversions'), value: selected.conversions ? selected.conversions.toLocaleString() : '—', color: 'text-emerald-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-bg-panel border border-border-main rounded-2xl p-5 shadow-md">
                <stat.icon size={20} className={`${stat.color} mb-2`} />
                <p className="text-xs text-zinc-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-text-main">{stat.value}</p>
                {selected.reach && stat.label === t('campaignResults.conversions') && (
                  <p className="text-xs text-zinc-500 mt-1">{((selected.conversions / selected.reach) * 100).toFixed(1)}% {t('campaignResults.convRate')}</p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-bg-panel border border-border-main rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-main">{getCampaignTitle(selected)}</h3>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColors[selected.statusKey]}`}>{getCampaignStatus(selected)}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-text-muted flex-wrap">
              <span>{selected.platform}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span className="flex items-center gap-1"><Clock size={14} />{getCampaignDate(selected)}</span>
              {selected.aiScoreKey && (
                <>
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  <span className={`flex items-center gap-1 font-bold ${scoreColors[selected.aiScoreKey]}`}>
                    <BarChart2 size={14} />{getCampaignScore(selected)}
                  </span>
                </>
              )}
            </div>
          </div>

          {getCampaignAiNote(selected) && (
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 rounded-2xl p-5 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400"><Sparkles size={14} /></div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{t('campaignResults.aiAnalysis')}</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{getCampaignAiNote(selected)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
