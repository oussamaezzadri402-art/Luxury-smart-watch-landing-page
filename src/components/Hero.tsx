import { useState, useEffect, MouseEvent } from 'react';
import { ShieldCheck, Truck, Clock, Sparkles, Award, Star, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WatchVariation } from '../types';
import { WATCH_VARIATIONS } from '../data';

interface HeroProps {
  selectedVariation: WatchVariation;
  onSelectVariation: (v: WatchVariation) => void;
  onScrollToCheckout: () => void;
  onFirePixel: (eventName: 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase', payload?: Record<string, any>) => void;
}

const HERO_GLOW_STYLES: Record<string, {
  mainGlow: string;
  secondaryGlow: string;
  shadow: string;
  badgeBg: string;
  badgeText: string;
  ring: string;
  activeBorder: string;
}> = {
  'rolex-rose-gold': {
    mainGlow: 'rgba(245, 158, 11, 0.24)',
    secondaryGlow: 'rgba(217, 119, 6, 0.10)',
    shadow: 'rgba(245, 158, 11, 0.35)',
    badgeBg: 'bg-amber-500/10 border-amber-500/30',
    badgeText: 'text-amber-400',
    ring: 'ring-amber-500/50',
    activeBorder: 'border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
  },
  'rolex-ice-blue': {
    mainGlow: 'rgba(56, 189, 248, 0.24)',
    secondaryGlow: 'rgba(14, 165, 233, 0.10)',
    shadow: 'rgba(56, 189, 248, 0.35)',
    badgeBg: 'bg-sky-500/10 border-sky-500/30',
    badgeText: 'text-sky-400',
    ring: 'ring-sky-500/50',
    activeBorder: 'border-sky-500/80 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
  },
  'rolex-navy-blue': {
    mainGlow: 'rgba(59, 130, 246, 0.24)',
    secondaryGlow: 'rgba(37, 99, 235, 0.10)',
    shadow: 'rgba(59, 130, 246, 0.35)',
    badgeBg: 'bg-blue-500/10 border-blue-500/30',
    badgeText: 'text-blue-400',
    ring: 'ring-blue-500/50',
    activeBorder: 'border-blue-500/80 shadow-[0_0_20px_rgba(59,130,246,0.25)]'
  }
};

export default function Hero({ selectedVariation, onSelectVariation, onScrollToCheckout, onFirePixel }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 12 });
  const [stockCount, setStockCount] = useState(11);
  const [hoveredVariationId, setHoveredVariationId] = useState<string | null>(null);

  const activeVariationId = hoveredVariationId || selectedVariation.id;
  const currentGlow = HERO_GLOW_STYLES[activeVariationId] || HERO_GLOW_STYLES['rolex-rose-gold'];
  const activeDisplayWatch = WATCH_VARIATIONS.find(v => v.id === activeVariationId) || selectedVariation;

  // 3D Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Trigger PageView event on load
  useEffect(() => {
    onFirePixel('PageView', { section: 'hero' });
  }, []);

  // Urgency Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 5, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Slowly deplete stock
  useEffect(() => {
    const stockTimer = setInterval(() => {
      setStockCount(prev => (prev > 3 ? prev - 1 : 12));
    }, 45000);
    return () => clearInterval(stockTimer);
  }, []);

  const handleCtaClick = () => {
    onFirePixel('InitiateCheckout', { source: 'hero_cta', price: 399 });
    onScrollToCheckout();
  };

  return (
    <section className="relative overflow-hidden bg-radial from-slate-900 via-slate-950 to-slate-950 pt-8 pb-16 px-4 sm:px-6 md:px-8 border-b border-zinc-900" id="hero-section">
      
      {/* Dynamic Background Ambient Light Glowing matching active watch color */}
      <motion.div 
        animate={{
          background: `radial-gradient(circle at 50% 35%, ${currentGlow.mainGlow} 0%, ${currentGlow.secondaryGlow} 45%, transparent 70%)`
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none opacity-80 z-0"
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Right Column: Copywriting & Urgency */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-right order-2 lg:order-1">
          
          {/* Eyebrow badge */}
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold w-fit mx-auto lg:mr-0 lg:ml-auto transition-colors duration-500 ${currentGlow.badgeBg} ${currentGlow.badgeText}`}>
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>عرض ترويجي خاص - خصم %50 صالح اليوم فالمغرب</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-snug">
            أناقة الملوك وفخامة الساعات السويسرية بـ{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-zinc-100 to-amber-300">
              399 درهم
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mr-0">
            اكتشف تشكيلة ساعات روليكس (ROLEX Edition) الفاخرة للرجال والنساء. تدمج بين التصميم الكلاسيكي المصنوع من الفولاذ المقاوم للصدأ وتصميم الشاشة الفخم لتضفي لمسة ساحرة على معصمك.
          </p>

          {/* Pricing & Offer */}
          <div className="bg-slate-900/60 border border-zinc-800 backdrop-blur-md rounded-2xl p-5 max-w-lg mx-auto lg:mr-0 w-full grid grid-cols-1 xs:grid-cols-3 gap-4 items-center">
            
            <div className="text-center border-b xs:border-b-0 xs:border-l border-zinc-800 pb-3 xs:pb-0 xs:pl-4">
              <span className="text-[10px] text-slate-500 block">الثمن العادي</span>
              <span className="text-sm sm:text-base text-slate-400 line-through font-mono">799 DH</span>
            </div>

            <div className="text-center border-b xs:border-b-0 xs:border-l border-zinc-800 pb-3 xs:pb-0 xs:pl-4">
              <span className="text-[10px] text-emerald-400 block font-bold">ثمن العرض الترويجي</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">399 DH</span>
            </div>

            <div className="text-center">
              <span className="text-[10px] text-emerald-500 block font-bold">التوصيل والشحن</span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-400">100% فابور</span>
            </div>

          </div>

          {/* Scarcity & Urgency (Countdown + Stock Bar) */}
          <div className="space-y-4 max-w-lg mx-auto lg:mr-0 w-full bg-slate-950 p-4 rounded-xl border border-zinc-900">
            
            {/* Stock Bar */}
            <div className="flex justify-between text-xs font-bold items-center">
              <span className="text-emerald-400 animate-pulse flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                باقي كمية قليلة بزاف!
              </span>
              <span className="text-slate-300">باقي غير <span className="text-emerald-400 font-mono text-sm">{stockCount} حبات</span> فالمستودع</span>
            </div>
            
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-zinc-850">
              <motion.div 
                className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full"
                initial={{ width: '100%' }}
                animate={{ width: `${(stockCount / 12) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>

            {/* Countdown */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>يسري هذا الخصم التنازلي لغاية:</span>
              <div className="flex gap-1.5 font-mono text-white text-xs font-bold">
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-zinc-800">{timeLeft.hours}h</span>
                <span>:</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-zinc-800">{timeLeft.minutes}m</span>
                <span>:</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-zinc-800 text-emerald-400">{timeLeft.seconds}s</span>
              </div>
            </div>

          </div>

          {/* CTA & Trust badges */}
          <div className="space-y-4 max-w-lg mx-auto lg:mr-0 w-full pt-2">
            <motion.button
              onClick={handleCtaClick}
              className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600 text-white text-base sm:text-lg font-black rounded-xl shadow-2xl shadow-emerald-950/40 hover:scale-102 active:scale-98 transition-all duration-150 cursor-pointer border border-emerald-400 text-center tracking-wide"
              whileHover={{ boxShadow: '0 0 25px rgba(16, 185, 129, 0.45)' }}
              id="hero-order-cta"
            >
              طلب دابا بـ 399 درهم (الشحن فابور)
            </motion.button>

            {/* Social Proof Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-400 pt-1">
              <div className="flex -space-x-2">
                <img className="w-6 h-6 rounded-full border border-slate-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" alt="Avatar" />
                <img className="w-6 h-6 rounded-full border border-slate-950 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80" alt="Avatar" />
                <img className="w-6 h-6 rounded-full border border-slate-950 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80" alt="Avatar" />
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-emerald-500">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span>طلبها كتر من <strong>1,480 زبون فالمغرب</strong> هذا الأسبوع (4.9/5)</span>
              </div>
            </div>

            {/* Guarantee Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-slate-400 border-t border-zinc-900">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <Truck className="w-3.5 h-3.5 text-emerald-500" />
                <span>شحن مجاني لكل المغرب</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>الدفع بعد فحص الساعة</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start col-span-2 sm:col-span-1">
                <Award className="w-3.5 h-3.5 text-emerald-500" />
                <span>ضمان سنة كاملة</span>
              </div>
            </div>

          </div>

        </div>

        {/* Left Column: Interactive Product Gallery & Display */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-5 order-1 lg:order-2">
          
          {/* Main Showcase Frame with 3D Tilt */}
          <div className="relative group max-w-md w-full" id="hero-image-container">
            
            {/* Soft decorative dynamic backdrop halo */}
            <motion.div 
              animate={{
                backgroundColor: currentGlow.shadow,
                scale: hoveredVariationId ? 1.08 : 1.0
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-3xl blur-3xl pointer-events-none" 
            />

            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
              animate={{
                rotateX: rotateX,
                rotateY: rotateY,
                z: rotateX !== 0 ? 15 : 0,
                opacity: 1,
                scale: 1
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              initial={{ opacity: 0, scale: 0.95 }}
              className="relative bg-slate-950/60 border border-zinc-800 rounded-2xl p-4 sm:p-6 overflow-hidden flex flex-col justify-center items-center cursor-grab active:cursor-grabbing backdrop-blur-md shadow-2xl"
            >
              {/* Corner brackets for luxury tech feel */}
              <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-emerald-500/30" />
              <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-emerald-500/30" />

              {/* Watch Display Image with motion animation */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeDisplayWatch.id}
                  src={activeDisplayWatch.image}
                  alt={activeDisplayWatch.nameAr}
                  className="w-full max-w-[340px] aspect-square object-contain rounded-xl drop-shadow-2xl"
                  style={{ transform: 'translateZ(40px)' }}
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    filter: `drop-shadow(0 20px 40px ${currentGlow.shadow})`
                  }}
                  exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  referrerPolicy="no-referrer"
                  id="hero-watch-image"
                />
              </AnimatePresence>

              {/* Active Watch Tag */}
              <div 
                className="absolute bottom-4 right-4 bg-slate-900/95 border border-zinc-800 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-xl" 
                style={{ transform: 'translateZ(30px)' }}
              >
                <span className="flex h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: activeDisplayWatch.colorCode }} />
                <span className="text-[11px] text-white font-bold font-mono">
                  {activeDisplayWatch.colorName}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Hero Gallery Slider / Thumbnails Selector */}
          <div className="w-full max-w-md bg-slate-900/80 border border-zinc-850 backdrop-blur-md p-3 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-bold">
              <span className="flex items-center gap-1 text-slate-300">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                معرض الساعات المتوفرة فالعرض:
              </span>
              <span className="text-emerald-400 font-mono">اختر موديلك المفصل ⤵</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {WATCH_VARIATIONS.map((varItem) => {
                const isSelected = selectedVariation.id === varItem.id;
                const glow = HERO_GLOW_STYLES[varItem.id];

                return (
                  <button
                    key={varItem.id}
                    onClick={() => onSelectVariation(varItem)}
                    onMouseEnter={() => setHoveredVariationId(varItem.id)}
                    onMouseLeave={() => setHoveredVariationId(null)}
                    className={`relative p-2 rounded-xl border transition-all cursor-pointer flex flex-col items-center gap-1.5 text-center overflow-hidden ${
                      isSelected
                        ? `${glow.activeBorder} bg-slate-950/90 text-white font-bold`
                        : 'border-zinc-800 bg-slate-950/40 text-slate-400 hover:border-zinc-700 hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Color dot badge */}
                    <div 
                      className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border border-slate-900 shadow-sm" 
                      style={{ backgroundColor: varItem.colorCode }}
                    />

                    <div className="w-full aspect-square max-h-16 flex items-center justify-center p-1">
                      <img 
                        src={varItem.image} 
                        alt={varItem.nameAr}
                        className="h-full object-contain rounded-md transition-transform group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <span className="text-[10px] line-clamp-1 leading-tight text-slate-200">
                      {varItem.colorName}
                    </span>

                    <span className="text-[9px] font-mono font-extrabold text-emerald-400">
                      399 DH
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
