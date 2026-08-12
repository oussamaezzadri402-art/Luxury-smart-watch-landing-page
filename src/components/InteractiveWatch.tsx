import { useState, MouseEvent } from 'react';
import { WatchVariation } from '../types';
import { WATCH_VARIATIONS } from '../data';
import { Sparkles, Gift, ShieldCheck, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveWatchProps {
  onSelectVariation: (variation: WatchVariation) => void;
  onScrollToCheckout: () => void;
  onFirePixel: (eventName: 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase', payload?: Record<string, any>) => void;
}

const MODEL_DETAILS: Record<string, { badge: string; desc: string }> = {
  'rolex-rose-gold': {
    badge: 'إصدار روز جولد الملكي 🔥',
    desc: 'ميناء خلية النحل الذهبي مع إطار وستريب روز جولد يعكس قمة الفخامة والأناقة.'
  },
  'rolex-ice-blue': {
    badge: 'إصدار أيس بلو النيزكي المميز ✨',
    desc: 'ميناء أيس بلو بنسيج رخامي نيزكي مرصع بعلامات الماس الباقات والفولاذ السويسري الناصع.'
  },
  'rolex-navy-blue': {
    badge: 'أناقة أزرق أطلسي رسمية 🌟',
    desc: 'ميناء أزرق ملكي مع لمس شعاع الشمس الفاخر للمناسبات والإطلالات الراقية.'
  }
};

const GLOW_COLORS: Record<string, { main: string; secondary: string; shadow: string; glowClass: string }> = {
  'rolex-rose-gold': {
    main: 'rgba(245, 158, 11, 0.22)', // Rose Gold Amber glow
    secondary: 'rgba(217, 119, 6, 0.12)',
    shadow: 'rgba(245, 158, 11, 0.35)',
    glowClass: 'from-amber-500/15'
  },
  'rolex-ice-blue': {
    main: 'rgba(56, 189, 248, 0.22)', // Ice Blue Sky glow
    secondary: 'rgba(14, 165, 233, 0.12)',
    shadow: 'rgba(56, 189, 248, 0.35)',
    glowClass: 'from-sky-500/15'
  },
  'rolex-navy-blue': {
    main: 'rgba(59, 130, 246, 0.22)', // Atlantic Ocean Blue glow
    secondary: 'rgba(37, 99, 235, 0.12)',
    shadow: 'rgba(59, 130, 246, 0.35)',
    glowClass: 'from-blue-500/15'
  }
};

export default function InteractiveWatch({
  onSelectVariation,
  onScrollToCheckout,
  onFirePixel
}: InteractiveWatchProps) {
  const [selectedEdition, setSelectedEdition] = useState<WatchVariation>(WATCH_VARIATIONS[0]);
  const [hoveredEditionId, setHoveredEditionId] = useState<string | null>(null);
  const [showGiftAlert, setShowGiftAlert] = useState(true);

  const activeGlowId = hoveredEditionId || selectedEdition.id;

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

  const handleEditionChange = (variation: WatchVariation) => {
    setSelectedEdition(variation);
    onSelectVariation(variation);

    onFirePixel('AddToCart', {
      item_id: variation.id,
      item_name: variation.name,
      price: variation.price,
      currency: 'MAD'
    });
  };

  const handleOrderCustomized = () => {
    onSelectVariation(selectedEdition);
    
    onFirePixel('InitiateCheckout', {
      variation: selectedEdition.id,
      price: selectedEdition.price
    });
    onScrollToCheckout();
  };

  return (
    <section className="bg-slate-900/40 py-20 px-4 sm:px-6 md:px-8 border-b border-zinc-900 relative overflow-hidden" id="customizer-section">
      {/* Dynamic Section Background Ambient Light */}
      <motion.div 
        animate={{
          background: `radial-gradient(circle at 50% 50%, ${GLOW_COLORS[activeGlowId]?.secondary || 'rgba(16, 185, 129, 0.05)'} 0%, transparent 70%)`
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none opacity-60"
      />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-500">اختر مظهرك المفضل</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            شمن موديل عجبك كثر؟
          </h2>
          <p className="text-sm text-slate-400">
            اختر الموديل الذي يناسب شخصيتك وأسلوب حياتك. جميع الموديلات مصنوعة من الفولاذ الصلب المقاوم للصدأ ومقاومة للماء.
          </p>
        </div>

        {/* Customizer Box */}
        <div className="bg-slate-950 border border-zinc-850 rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto shadow-2xl relative">
          
          {/* Left Panel: Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative space-y-4">
            
            {/* Gift Alert Banner */}
            <AnimatePresence>
              {showGiftAlert && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-xs bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-[11px] py-1.5 px-3 rounded-full shadow-lg flex items-center justify-between gap-1 border border-emerald-400"
                >
                  <span className="flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 shrink-0 fill-current" />
                    <span>هدية اليوم: واقي شاشة زجاجي + علبة روليكس الملكية! 🎁</span>
                  </span>
                  <button onClick={() => setShowGiftAlert(false)} className="text-xs hover:opacity-75 font-bold cursor-pointer">×</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Watch Screen Wrapper with Interactive 3D Perspective Tilt */}
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
                z: rotateX !== 0 ? 10 : 0
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="relative p-6 sm:p-10 bg-slate-900/40 rounded-2xl border border-zinc-850 flex justify-center items-center w-full aspect-square max-w-[340px] overflow-hidden group cursor-grab active:cursor-grabbing shadow-xl"
            >
              {/* Animated Glow Core Background */}
              <motion.div 
                animate={{
                  backgroundColor: GLOW_COLORS[activeGlowId]?.main || 'rgba(16, 185, 129, 0.16)',
                  scale: hoveredEditionId ? 1.2 : 1.0,
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                className="absolute w-56 h-56 rounded-full blur-[60px] pointer-events-none" 
              />

              <motion.img
                key={selectedEdition.id}
                src={selectedEdition.image}
                alt="Luxury Rolex Watch Preview"
                className="w-full h-full object-contain rounded-lg"
                style={{ transform: 'translateZ(30px)' }}
                initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  filter: `drop-shadow(0 15px 35px ${GLOW_COLORS[activeGlowId]?.shadow || 'rgba(16, 185, 129, 0.25)'})`
                }}
                transition={{ duration: 0.4, type: 'spring' }}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                id="customizer-preview-image"
              />

              {/* Floating Active Badges */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] bg-slate-950/95 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-zinc-850" style={{ transform: 'translateZ(25px)' }}>
                <span className="text-emerald-400 font-extrabold">{selectedEdition.colorName}</span>
                <span className="text-slate-700">|</span>
                <span className="text-slate-300 font-medium">{selectedEdition.strapNameAr}</span>
              </div>
            </motion.div>

            {/* Extra details indicator */}
            <div className="flex gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>جودة الهيكل مكفولة كلياً بالضمان السنوي الفضي</span>
            </div>
          </div>

          {/* Right Panel: Controllers (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Model Choices */}
            <div className="space-y-4">
              <span className="text-sm font-black text-emerald-500 block">اختر الموديل المفضل لديك:</span>
              <div className="space-y-3">
                {WATCH_VARIATIONS.map((v) => {
                  const details = MODEL_DETAILS[v.id] || { badge: 'إصدار فاخر ✨', desc: '' };
                  const isSelected = selectedEdition.id === v.id;
                  
                  return (
                    <button
                      key={v.id}
                      onClick={() => handleEditionChange(v)}
                      onMouseEnter={() => setHoveredEditionId(v.id)}
                      onMouseLeave={() => setHoveredEditionId(null)}
                      className={`w-full p-4 text-right border rounded-2xl transition-all cursor-pointer flex flex-col sm:flex-row-reverse sm:items-center justify-between gap-4 relative overflow-hidden ${
                        isSelected
                          ? 'bg-emerald-500/10 border-emerald-500/80 text-white shadow-lg ring-1 ring-emerald-500/30'
                          : 'bg-slate-900/40 border-zinc-900 text-slate-400 hover:border-zinc-800'
                      }`}
                      id={`customizer-edition-${v.id}`}
                    >
                      <div className="flex items-start gap-3 flex-row-reverse">
                        {/* Dial Color Dot Preview */}
                        <div 
                          className="h-10 w-10 rounded-xl border border-zinc-800 shrink-0 flex items-center justify-center relative shadow-inner overflow-hidden mt-1"
                          style={{ background: `radial-gradient(circle, ${v.colorCode} 0%, #1e293b 100%)` }}
                        >
                          <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-row-reverse flex-wrap">
                            <span className="text-sm font-extrabold text-white">{v.nameAr}</span>
                            <span className="text-[9px] font-extrabold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/10">
                              {details.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed max-w-md">
                            {details.desc}
                          </p>
                        </div>
                      </div>

                      {/* Pricing block inside option */}
                      <div className="flex sm:flex-col items-end sm:items-start justify-between sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-900/50 shrink-0 font-mono">
                        <span className="text-xl font-black text-emerald-400">{v.price} DH</span>
                        <span className="text-xs text-slate-500 line-through">{v.originalPrice} DH</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gift Bundle Callout */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-start gap-3 justify-end text-right">
              <div className="space-y-1">
                <h5 className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5 justify-end">
                  <span>هدية العرض الخاصة: طقم روليكس الفاخر</span>
                  <Gift className="w-4 h-4 text-emerald-400 fill-current" />
                </h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  مع طلبك اليوم، ستحصل تلقائياً على <strong>علبة روليكس الخشبية الملكية الخضراء</strong> + <strong>حامي شاشة مضاد للكسر والخدش</strong> مجاناً مع التوصيل السريع!
                </p>
              </div>
            </div>

            {/* Price block and Order Trigger */}
            <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row-reverse justify-between items-center gap-4">
              <div className="text-right sm:text-left">
                <span className="text-[10px] text-slate-500 block">المجموع الصافي للدفع</span>
                <div className="flex items-center gap-2 justify-end sm:justify-start">
                  <span className="text-[11px] text-slate-500 line-through font-mono">799 DH</span>
                  <span className="text-2xl font-extrabold text-white font-mono">{selectedEdition.price} DH</span>
                </div>
                <span className="text-[10px] text-emerald-400 block font-bold">الدفع عند الاستلام + التوصيل فابور</span>
              </div>

              <button
                onClick={handleOrderCustomized}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm transition-all duration-150 cursor-pointer border border-emerald-400 shadow-lg shadow-emerald-950/20"
                id="customizer-order-btn"
              >
                <ShoppingCart className="w-4 h-4 text-white fill-current" />
                <span>أكد طلب الموديل ودوز للطلب دابا</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
