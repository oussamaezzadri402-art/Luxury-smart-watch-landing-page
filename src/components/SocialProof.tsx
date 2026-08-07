import { useState, useEffect } from 'react';
import { CUSTOMER_REVIEWS } from '../data';
import { Star, ShieldCheck, UserCheck, MessageSquare, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOROCCAN_BUYER_ALERTS = [
  { name: 'محمد من سلا', city: 'سلا', time: 'قبل دقيقة واحدة', variation: 'إصدار الروز جولد - ميناء خلية النحل' },
  { name: 'ليلى من مراكش', city: 'مراكش', time: 'قبل 3 دقائق', variation: 'إصدار الأيس بلو النيزكي (Ice Blue)' },
  { name: 'جلال من طنجة', city: 'طنجة', time: 'قبل 5 دقائق', variation: 'إصدار الأزرق الأطلسي الملكي' },
  { name: 'أيوب من وجدة', city: 'وجدة', time: 'قبل 7 دقائق', variation: 'إصدار الروز جولد - ميناء خلية النحل' },
  { name: 'حنان من فاس', city: 'فاس', time: 'قبل 9 دقائق', variation: 'إصدار الأيس بلو النيزكي (Ice Blue)' },
  { name: 'سفيان من تمارة', city: 'تمارة', time: 'قبل 12 دقيقة', variation: 'إصدار الأزرق الأطلسي الملكي' },
  { name: 'عمر من الدار البيضاء', city: 'الدار البيضاء', time: 'قبل 15 دقيقة', variation: 'إصدار الروز جولد - ميناء خلية النحل' }
];

interface SocialProofProps {
  mockTriggerTimestamp: number; // Used to manually trigger an alert from PortfolioInspector
}

export default function SocialProof({ mockTriggerTimestamp }: SocialProofProps) {
  const [activeAlert, setActiveAlert] = useState<typeof MOROCCAN_BUYER_ALERTS[0] | null>(null);
  const [alertIndex, setAlertIndex] = useState(0);

  // Rotate alerts periodically
  useEffect(() => {
    // Show first alert after 6 seconds
    const startTimeout = setTimeout(() => {
      showNextAlert();
    }, 6000);

    return () => clearTimeout(startTimeout);
  }, []);

  // Set up interval rotation
  useEffect(() => {
    const interval = setInterval(() => {
      showNextAlert();
    }, 18000); // Repeat every 18s (showing for 5s)

    return () => clearInterval(interval);
  }, [alertIndex]);

  // Handle manual trigger from PortfolioInspector
  useEffect(() => {
    if (mockTriggerTimestamp > 0) {
      // Trigger a special random alert instantly!
      const randomAlert = MOROCCAN_BUYER_ALERTS[Math.floor(Math.random() * MOROCCAN_BUYER_ALERTS.length)];
      setActiveAlert({
        ...randomAlert,
        name: 'زبون تجريبي من لوحة التحكم',
        time: 'الآن'
      });
      
      const timeout = setTimeout(() => {
        setActiveAlert(null);
      }, 6000);
      return () => clearTimeout(timeout);
    }
  }, [mockTriggerTimestamp]);

  const showNextAlert = () => {
    const nextIdx = (alertIndex + 1) % MOROCCAN_BUYER_ALERTS.length;
    setAlertIndex(nextIdx);
    setActiveAlert(MOROCCAN_BUYER_ALERTS[nextIdx]);

    // Auto close alert after 5.5 seconds
    const closeTimeout = setTimeout(() => {
      setActiveAlert(null);
    }, 5500);

    return () => clearTimeout(closeTimeout);
  };

  return (
    <section className="bg-slate-950 py-20 px-4 sm:px-6 md:px-8 border-b border-zinc-900 relative" id="reviews-section">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-500">آراء وتقييمات زبنائنا</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            شنو كيقولو الناس اللي جربو الساعة؟
          </h2>
          <p className="text-sm text-slate-400">
            أكتر من 1,480 مغربي ومغربية وثقو فينا واختارو الأناقة والتميز. تقييمات حقيقية من كاع المدن المغربية.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-slate-900/30 border border-zinc-900 rounded-2xl p-5 sm:p-6 space-y-4 hover:border-zinc-800 transition-colors duration-200 flex flex-col justify-between"
              id={`review-card-${rev.id}`}
            >
              <div className="space-y-3 text-right">
                {/* Header: User Avatar & Verified Badge */}
                <div className="flex justify-between items-center flex-row-reverse">
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <img 
                      src={rev.avatar} 
                      alt={rev.userName} 
                      className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="text-right">
                      <h4 className="font-bold text-white text-sm">{rev.userName}</h4>
                      <span className="text-[10px] text-slate-500 block">{rev.city} • {rev.date}</span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-emerald-500 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-emerald-500" />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "{rev.comment}"
                </p>

                {/* Optional Review Image */}
                {rev.productImage && (
                  <div className="pt-2">
                    <img 
                      src={rev.productImage} 
                      alt="Product review photo" 
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-zinc-850 hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Verified Purchase Check */}
              <div className="pt-3 border-t border-slate-950 flex items-center justify-between text-[10px] text-emerald-500 mt-2">
                <span className="font-mono text-slate-500">مشتري مؤكد #COD_{rev.id}</span>
                <span className="flex items-center gap-1 font-bold">
                  <span>زبون مؤكد</span>
                  <UserCheck className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Localized trust seals */}
        <div className="max-w-4xl mx-auto pt-6 border-t border-zinc-900 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-xs">
          <div className="space-y-1">
            <span className="text-lg font-bold text-white block">100% رضا مضمون</span>
            <p className="text-[10px] text-slate-500">حققنا أزيد من 98% نسبة رضا لدى زبنائنا فالمغرب</p>
          </div>
          <div className="space-y-1">
            <span className="text-lg font-bold text-white block">معاينة قبل الأداء</span>
            <p className="text-[10px] text-slate-500">حل الكرتونة وشوف ساعتك عاد خلص الليفرور</p>
          </div>
          <div className="space-y-1">
            <span className="text-lg font-bold text-white block">كارانتي سنة كاملة</span>
            <p className="text-[10px] text-slate-500">خدمة ما بعد البيع وضمان حقيقي لجميع المشاكل</p>
          </div>
          <div className="space-y-1">
            <span className="text-lg font-bold text-white block">توصيل لجميع المدن</span>
            <p className="text-[10px] text-slate-500">سواء كنت فالمدينة أو الفيلاج التوصيل كيوصلك فابور</p>
          </div>
        </div>

      </div>

      {/* ⚠️ Real-time Urgency Purchase Toast Overlay (CRO Weapon) */}
      <AnimatePresence>
        {activeAlert && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className="fixed bottom-24 left-6 z-40 max-w-[290px] bg-slate-900/95 border border-zinc-800 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl flex items-start gap-3 text-right"
            id="social-proof-toast"
          >
            {/* Visual Icon */}
            <div className="p-2 bg-emerald-500/15 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>

            {/* Alert content */}
            <div className="flex-1 space-y-0.5">
              <div className="flex justify-between items-start flex-row-reverse">
                <h5 className="font-bold text-white text-[12px]">{activeAlert.name}</h5>
                <span className="text-[9px] text-slate-500 font-mono">{activeAlert.time}</span>
              </div>
              <p className="text-[10px] text-slate-300 leading-tight">
                قام بطلب <span className="text-emerald-400 font-semibold">{activeAlert.variation}</span>.
              </p>
              <div className="flex justify-between items-center pt-1.5 border-t border-slate-950 mt-1 flex-row-reverse">
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-extrabold px-1.5 py-0.2 rounded">الدفع عند الاستلام</span>
                <span className="text-[9px] text-slate-500 flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>طلب مؤكد</span>
                </span>
              </div>
            </div>

            {/* Manual Close Button */}
            <button 
              onClick={() => setActiveAlert(null)}
              className="text-slate-500 hover:text-white transition-colors cursor-pointer text-xs"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
