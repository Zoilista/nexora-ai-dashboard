import React, { useState } from 'react';
import { Sparkles, Building2, Scissors, Dumbbell, Coffee, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const businessTypes = [
  { id: 'salon', icon: Scissors, labelKey: 'onboarding.types.salon' },
  { id: 'clinic', icon: Building2, labelKey: 'onboarding.types.clinic' },
  { id: 'gym', icon: Dumbbell, labelKey: 'onboarding.types.gym' },
  { id: 'cafe', icon: Coffee, labelKey: 'onboarding.types.cafe' },
  { id: 'shop', icon: ShoppingBag, labelKey: 'onboarding.types.shop' },
];

const goals = [
  { id: 'bookings', titleKey: 'onboarding.goals.bookings', descKey: 'onboarding.goals.bookingsDesc' },
  { id: 'time', titleKey: 'onboarding.goals.time', descKey: 'onboarding.goals.timeDesc' },
  { id: 'retention', titleKey: 'onboarding.goals.retention', descKey: 'onboarding.goals.retentionDesc' },
];

export const OnboardingModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState('');

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <div className="h-full bg-purple-500 transition-all duration-500 ease-out" style={{ width: `${(step / 2) * 100}%` }} />
        </div>

        <div className="p-10 flex-1">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Sparkles className="text-purple-400 w-6 h-6" />
            </div>
            {step > 1 && (
              <button 
                onClick={() => setStep(1)} 
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors font-medium"
              >
                <ChevronLeft size={16} />
                {t('onboarding.back')}
              </button>
            )}
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold text-white tracking-tight">{t('onboarding.welcome')}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{t('onboarding.welcomeDesc')}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {businessTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setBusinessType(type.id)}
                    className={`p-6 rounded-2xl border flex flex-col items-center gap-4 transition-all duration-300 group ${
                      businessType === type.id 
                        ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.15)] scale-[1.02]' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <type.icon size={32} className={businessType === type.id ? 'text-purple-400' : 'text-zinc-400'} />
                    <span className={`text-sm font-semibold ${businessType === type.id ? 'text-white' : 'text-zinc-300'}`}>{t(type.labelKey)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold text-white tracking-tight">{t('onboarding.goal')}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{t('onboarding.goalDesc')}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={onClose}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors mb-1">{t(goal.titleKey)}</h3>
                    <p className="text-sm text-zinc-400">{t(goal.descKey)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/5 bg-[#050505] flex justify-end">
          {step === 1 && (
            <button 
              onClick={handleNext}
              disabled={!businessType}
              className={`btn-primary px-8 py-3 text-sm ${!businessType ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
            >
              {t('onboarding.continue')}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
