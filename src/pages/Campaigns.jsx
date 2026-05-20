import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Clock, Hash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useBusiness } from '../context/BusinessContext';

const generatePreview = (platform, goal, businessType) => {
  const previews = {
    Instagram: {
      salon: `✨ Transform your look this week! Our signature facial & massage packages are booking fast. ${goal ? `Perfect for: ${goal}.` : ''} Limited slots available — tap the link in bio to book now! 💜\n\nBook online 24/7 • Same-day appointments available`,
      clinic: `🏥 Your health is our priority. ${goal ? goal + ' — ' : ''}Our specialists are ready to help. Book your consultation today and take the first step towards better wellness. ✅`,
      gym: `💪 Ready to crush your goals? ${goal ? goal + '! ' : ''}Join our premium fitness community. First class FREE for new members this week only! 🔥`,
      cafe: `☕ Start your morning right with us! ${goal ? goal + '. ' : ''}Freshly brewed specialty coffee & artisan pastries await. Stop by and treat yourself — you deserve it! 🥐`,
      shop: `🛍️ New arrivals just dropped! ${goal ? goal + '. ' : ''}Shop our latest collection and enjoy exclusive member discounts. Fast shipping & easy returns. 💫`,
    },
    Facebook: {
      salon: `📣 Special offer this week only! We're offering our premium beauty treatments at exclusive prices. ${goal || 'Book your appointment today'} and experience the difference! 🌟`,
      clinic: `Healthcare made easy. ${goal || 'Schedule your appointment'} with our experienced medical team today. We care about your wellness. Book online — fast & hassle-free.`,
      gym: `🏋️ Join our fitness family! ${goal || 'New member special'} — Get access to all classes and premium equipment. Your fitness journey starts here!`,
      cafe: `Good food. Great coffee. Perfect moments. ${goal || 'Visit us this weekend'} and discover why we're the neighborhood\'s favorite spot! 🍃`,
      shop: `🎁 Exclusive deals for our Facebook community! ${goal || 'Shop now'} and enjoy free shipping on orders over $50. New products added weekly!`,
    },
    TikTok: {
      salon: `POV: You finally treated yourself 💅✨ ${goal || 'Book your glow-up today'} — link in bio! #SalonLife #BeautyTok #GlowUp`,
      clinic: `Your sign to take care of your health 🌿 ${goal || 'Book your wellness check'} — easy online booking! #HealthTok #WellnessJourney`,
      gym: `No more excuses! 💪🔥 ${goal || 'Your fitness journey starts NOW'} — first class free! #GymTok #FitnessMotivation #GetFit`,
      cafe: `This is your sign to try our viral matcha latte ☕🤍 ${goal || 'Find us in the link below'} #CafeTok #CoffeeLovers #ViralDrink`,
      shop: `Things I found that changed my life ✨🛍️ ${goal || 'Shop now — link in bio'} #ShopTok #MustHave #TikTokMadeMeBuyIt`,
    }
  };

  return (previews[platform]?.[businessType]) || previews[platform]?.salon || '';
};

const hashtagSuggestions = {
  salon: ['#BeautyTreatment', '#SelfCare', '#GlowUp', '#SkincareTok', '#BookNow'],
  clinic: ['#HealthFirst', '#Wellness', '#MedicalCare', '#BookYourAppointment', '#Healthcare'],
  gym: ['#FitnessGoals', '#GymLife', '#GetFit', '#WorkoutMotivation', '#FitnessJourney'],
  cafe: ['#CoffeeLovers', '#CafeVibes', '#FoodPhotography', '#BreakfastGoals', '#LocalCafe'],
  shop: ['#ShopNow', '#NewArrivals', '#Fashion', '#OnlineShopping', '#MustHave'],
};

const optimalTimes = {
  Instagram: '6:00 PM – 9:00 PM',
  Facebook: '1:00 PM – 4:00 PM',
  TikTok: '7:00 PM – 11:00 PM',
};

export const Campaigns = () => {
  const { t } = useTranslation();
  const { businessType } = useBusiness();
  const [platform, setPlatform] = useState('Instagram');
  const [goal, setGoal] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [preview, setPreview] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setPreview(null);
    setTimeout(() => {
      setPreview({
        text: generatePreview(platform, goal, businessType),
        hashtags: hashtagSuggestions[businessType] || hashtagSuggestions.salon,
        time: optimalTimes[platform],
        platform,
      });
      setIsGenerating(false);
    }, 1800);
  };

  const handleCopy = () => {
    if (preview) {
      const fullText = `${preview.text}\n\n${preview.hashtags.join(' ')}`;
      navigator.clipboard.writeText(fullText).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500 space-y-6">
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
          <Sparkles className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">{t('campaigns.title')}</h1>
          <p className="text-sm text-zinc-400">{t('campaigns.subtitle')}</p>
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-xl">
        <form className="space-y-6" onSubmit={handleGenerate}>
           <div className="space-y-3">
              <label className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">{t('campaigns.platform')}</label>
              <div className="flex gap-3">
                 {['Instagram', 'Facebook', 'TikTok'].map(p => (
                   <button 
                     key={p}
                     type="button"
                     onClick={() => setPlatform(p)}
                     className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${
                       platform === p 
                        ? 'bg-purple-500/10 border-purple-500 text-white' 
                        : 'bg-white/5 border-transparent text-zinc-400 hover:bg-white/10'
                     }`}
                   >
                     {p}
                   </button>
                 ))}
              </div>
           </div>

           <div className="space-y-3">
             <label className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest flex justify-between">
               <span>{t('campaigns.goal')}</span>
             </label>
             <input 
               type="text" 
               value={goal}
               onChange={e => setGoal(e.target.value)}
               placeholder={t('campaigns.goalPlaceholder')}
               className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
             />
           </div>

           <div className="space-y-3">
             <label className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">
               {t('campaigns.keyPoints')}
             </label>
             <textarea 
               rows="3"
               value={keyPoints}
               onChange={e => setKeyPoints(e.target.value)}
               placeholder={t('campaigns.keyPointsPlaceholder')}
               className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all resize-none"
             />
           </div>

           <div className="pt-2">
              <button type="submit" disabled={isGenerating} className="w-full bg-purple-500 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-purple-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg flex justify-center items-center gap-2">
                {isGenerating ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    {t('campaigns.generating')}
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    {t('campaigns.generate')}
                  </>
                )}
              </button>
           </div>
        </form>
      </div>

      {/* AI Preview Output */}
      {preview && (
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 rounded-2xl p-6 shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{t('campaigns.preview')}</h3>
                <p className="text-xs text-zinc-400">{t('campaigns.previewSubtitle')} {preview.platform}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGenerate}
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl transition-all"
            >
              <RefreshCw size={12} />
              {t('campaigns.regenerate')}
            </button>
          </div>

          {/* Post Text */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-5 mb-4 relative">
            <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">{preview.text}</p>
          </div>

          {/* Hashtags */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Hash size={13} className="text-purple-400" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{t('campaigns.hashtags')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {preview.hashtags.map((tag, i) => (
                <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Optimal Time */}
          <div className="flex items-center gap-2 mb-5 p-3 bg-blue-500/5 border border-blue-500/15 rounded-xl">
            <Clock size={14} className="text-blue-400 shrink-0" />
            <span className="text-xs font-bold text-zinc-400">{t('campaigns.suggestedTime')}:</span>
            <span className="text-xs font-bold text-blue-300">{preview.time}</span>
          </div>

          {/* Actions */}
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              copied 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'bg-white text-black hover:bg-zinc-100 shadow-md'
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? t('campaigns.copied') : t('campaigns.copy')}
          </button>
        </div>
      )}
    </div>
  );
};
