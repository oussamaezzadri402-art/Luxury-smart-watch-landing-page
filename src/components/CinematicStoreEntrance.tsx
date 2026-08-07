import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, Volume2, VolumeX, Eye } from 'lucide-react';
import { WatchVariation } from '../types';
import facadeImg from '../assets/images/rolex_boutique_facade_1785881811734.jpg';
import interiorImg from '../assets/images/rolex_boutique_interior_1785881826962.jpg';

interface CinematicStoreEntranceProps {
  selectedWatch: WatchVariation;
  onComplete: () => void;
}

export default function CinematicStoreEntrance({ selectedWatch, onComplete }: CinematicStoreEntranceProps) {
  const [phase, setPhase] = useState<'exterior' | 'interior' | 'watch_zoom' | 'fade_out'>('exterior');
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Stage timeline timing (3.6s total for high-impact commercial feel)
    const timer1 = setTimeout(() => {
      setPhase('interior');
    }, 1300);

    const timer2 = setTimeout(() => {
      setPhase('watch_zoom');
    }, 2500);

    const timer3 = setTimeout(() => {
      setPhase('fade_out');
    }, 3400);

    const timer4 = setTimeout(() => {
      onComplete();
    }, 3900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-entrance-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'fade_out' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-[100] bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden select-none pointer-events-auto"
        style={{ perspective: '1200px' }}
      >
        {/* Top Control Bar */}
        <div className="relative z-30 flex items-center justify-between p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {/* Brand Tag */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-amber-200 uppercase font-mono">
              ROLEX BOUTIQUE PREMIERE 3D
            </span>
          </div>

          {/* Skip Button */}
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 hover:bg-emerald-600 text-white font-bold text-xs rounded-full border border-zinc-700 hover:border-emerald-500 shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            id="skip-intro-btn"
          >
            <span>تخطي العرض للدخول فوراً</span>
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* 3D Camera Fly-in Scene Container */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-10">
          
          {/* Stage 1: Exterior Grand Facade View */}
          <motion.div
            initial={{ scale: 1, z: 0, opacity: 1, filter: 'blur(0px)' }}
            animate={{
              scale: phase === 'exterior' ? 1.15 : 2.2,
              opacity: phase === 'exterior' ? 1 : 0,
              filter: phase === 'exterior' ? 'blur(0px)' : 'blur(8px)'
            }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={facadeImg}
              alt="Rolex Boutique Exterior Facade"
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            
            {/* Exterior Gold Ambient Lighting Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />

            {/* Floating Title Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase === 'exterior' ? 1 : 0, y: phase === 'exterior' ? 0 : -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-x-0 bottom-1/4 text-center px-4 space-y-2 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>مرحباً بكم في معرض الساعات الملكية الفاخرة</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wide drop-shadow-2xl font-serif">
                مجرستيك روليكس المغرب
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans font-medium">
                جولة سريعة داخل الجناح الملكي قبل استعراض منتجات العرض اليوم
              </p>
            </motion.div>
          </motion.div>

          {/* Stage 2: Interior Showcase Room & Pedestal View */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, filter: 'blur(10px)' }}
            animate={{
              scale: phase === 'interior' ? 1.05 : phase === 'watch_zoom' ? 1.8 : 0.7,
              opacity: phase === 'interior' || phase === 'watch_zoom' ? 1 : 0,
              filter: phase === 'interior' ? 'blur(0px)' : phase === 'watch_zoom' ? 'blur(4px)' : 'blur(10px)'
            }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            <img
              src={interiorImg}
              alt="Rolex Boutique Interior Room Showcase"
              className="w-full h-full object-cover object-center"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />

            {/* Interior Spotlight Glow */}
            <div className="absolute inset-0 bg-radial from-amber-500/20 via-slate-950/50 to-slate-950/90 pointer-events-none" />

            {/* Stage 3: High-Detail Watch Floating Pedestal Spotlight */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center p-4">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 40 }}
                animate={{
                  scale: phase === 'watch_zoom' ? 1.25 : phase === 'interior' ? 0.9 : 0.5,
                  opacity: phase === 'interior' || phase === 'watch_zoom' ? 1 : 0,
                  y: phase === 'watch_zoom' ? -10 : 0
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative group"
              >
                {/* Golden Radial Aura */}
                <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-3xl animate-pulse" />

                <img
                  src={selectedWatch.image}
                  alt={selectedWatch.nameAr}
                  className="w-56 sm:w-80 aspect-square object-contain relative z-10 drop-shadow-[0_25px_50px_rgba(245,158,11,0.4)]"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Watch Title Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2 bg-slate-900/90 border border-amber-500/40 backdrop-blur-md px-4 py-2 rounded-xl text-center shadow-2xl inline-block"
                >
                  <span className="text-xs font-mono text-amber-400 font-bold block">
                    {selectedWatch.nameAr}
                  </span>
                  <span className="text-[10px] text-slate-300 font-bold block mt-0.5">
                    السعر الاستثنائي: <span className="text-emerald-400 font-mono text-xs">399 درهم</span> (شحن مجاني)
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Light Lens Flare Effect during transition */}
          <motion.div
            animate={{
              opacity: phase === 'watch_zoom' ? [0, 0.8, 0] : 0,
              scale: phase === 'watch_zoom' ? [0.8, 1.4, 2] : 0.8
            }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-r from-amber-500/20 via-emerald-400/30 to-amber-500/20 rounded-full blur-2xl"
          />

        </div>

        {/* Bottom Progress Indicator */}
        <div className="relative z-30 max-w-md w-full mx-auto p-4 sm:p-6 text-center space-y-3">
          <div className="w-full bg-slate-900/80 border border-zinc-800 h-2 rounded-full overflow-hidden p-0.5 backdrop-blur-md">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: phase === 'exterior' ? '35%' : phase === 'interior' ? '70%' : '100%' }}
              transition={{ duration: 1.2, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-400 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.8)]"
            />
          </div>

          <p className="text-[11px] text-slate-400 font-medium animate-pulse">
            جاري تحضير تجربة التسوق الفاخرة...
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
