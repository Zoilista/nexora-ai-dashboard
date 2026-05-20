import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBusiness } from '../context/BusinessContext';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const businessScores = {
  salon: { score: 82, v: ['87%', '4.8/5', '12'], pos: [true, true, false] },
  clinic: { score: 74, v: ['76%', '8%', '4.6/5'], pos: [true, false, true] },
  gym: { score: 68, v: ['142', '61%', '74%'], pos: [true, false, true] },
  cafe: { score: 88, v: ['94%', '$24.50', '3'], pos: [true, true, false] },
  shop: { score: 71, v: ['78%', '22%', '61%'], pos: [false, false, true] },
};

const getColors = (score) => {
  if (score >= 75) return { stroke: '#8b5cf6', text: 'text-purple-400', badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20', glow: 'rgba(139,92,246,0.15)' };
  if (score >= 50) return { stroke: '#f59e0b', text: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20', glow: 'rgba(245,158,11,0.15)' };
  return { stroke: '#ef4444', text: 'text-red-400', badge: 'bg-red-500/10 text-red-300 border-red-500/20', glow: 'rgba(239,68,68,0.15)' };
};

const getLabel = (score, t) => {
  if (score >= 75) return t('healthScore.excellent');
  if (score >= 50) return t('healthScore.good');
  return t('healthScore.needsAttention');
};

export const HealthScoreGauge = () => {
  const { t } = useTranslation();
  const { businessType } = useBusiness();
  const [displayScore, setDisplayScore] = useState(0);

  const rawData = businessScores[businessType] || businessScores.salon;
  const targetScore = rawData.score;
  const colors = getColors(targetScore);

  // Build i18n-keyed factors and note
  const bt = businessType in businessScores ? businessType : 'salon';
  const factors = [
    { label: t(`healthScore.factors.${bt}.f1`), value: rawData.v[0], positive: rawData.pos[0] },
    { label: t(`healthScore.factors.${bt}.f2`), value: rawData.v[1], positive: rawData.pos[1] },
    { label: t(`healthScore.factors.${bt}.f3`), value: rawData.v[2], positive: rawData.pos[2] },
  ];
  const aiNote = t(`healthScore.factors.${bt}.note`);

  // SVG semi-circle arc parameters
  const cx = 90, cy = 85, r = 70, strokeWidth = 12;
  const arcLen = Math.PI * r; // half-circumference
  const filled = (displayScore / 100) * arcLen;
  const gap = arcLen - filled;

  // Animate count-up on mount / businessType change
  useEffect(() => {
    setDisplayScore(0);
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayScore(Math.round(eased * targetScore));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [targetScore]);

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-lg animate-in fade-in duration-500">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">{t('healthScore.title')}</h3>
          <p className="text-xs text-zinc-500 mt-0.5">{t('healthScore.subtitle')}</p>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${colors.badge}`}>
          {getLabel(targetScore, t)}
        </span>
      </div>

      <div className="flex items-center gap-6">
        {/* SVG Gauge */}
        <div className="relative shrink-0" style={{ width: 180, height: 100 }}>
          {/* Glow behind gauge */}
          <div className="absolute inset-0 rounded-full blur-2xl opacity-60 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at bottom, ${colors.glow} 0%, transparent 70%)` }} />
          <svg width="180" height="100" viewBox="0 0 180 100" style={{ overflow: 'visible' }}>
            {/* Track */}
            <path
              d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Filled arc */}
            <path
              d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
              fill="none"
              stroke={colors.stroke}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${filled} ${gap}`}
              style={{ filter: `drop-shadow(0 0 6px ${colors.stroke}80)` }}
            />
          </svg>
          {/* Score centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
            <span className={`text-4xl font-black font-display ${colors.text} leading-none`}>{displayScore}</span>
            <span className="text-[10px] text-zinc-500 font-medium mt-0.5">/100</span>
          </div>
        </div>

        {/* Factors list */}
        <div className="flex-1 space-y-2.5 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">{t('healthScore.keyFactors')}</p>
          {factors.map((f, i) => (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                {f.positive
                  ? <TrendingUp size={12} className="text-emerald-400 shrink-0" />
                  : <TrendingDown size={12} className="text-orange-400 shrink-0" />}
                <span className="text-xs text-zinc-400 truncate">{f.label}</span>
              </div>
              <span className={`text-xs font-bold shrink-0 ${f.positive ? 'text-emerald-400' : 'text-orange-400'}`}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Note */}
      <div className="mt-4 px-4 py-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mr-2">{t('healthScore.aiNote')}:</span>
        <span className="text-xs text-zinc-300 leading-relaxed">{aiNote}</span>
      </div>
    </div>
  );
};
