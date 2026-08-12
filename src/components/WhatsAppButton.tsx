import { useState, useEffect } from 'react';
import { WatchVariation } from '../types';
import { MessageCircle, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { sendOrderToGoogleSheets } from '../lib/googleSheets';

interface WhatsAppButtonProps {
  selectedVariation: WatchVariation;
  onFirePixel: (eventName: 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase', payload?: Record<string, any>) => void;
}

export default function WhatsAppButton({ selectedVariation, onFirePixel }: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneNumber = '212679998628'; // Moroccan WhatsApp Helpline

  useEffect(() => {
    // Check if notification was already shown or dismissed in this browser session
    const hasBeenShown = sessionStorage.getItem('rolex_wa_tooltip_shown');
    if (hasBeenShown) return;

    // Delayed initial appearance (3 seconds after page load)
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
      sessionStorage.setItem('rolex_wa_tooltip_shown', 'true');

      // Auto-dismiss after 5.5 seconds
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 5500);

      return () => clearTimeout(hideTimer);
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = () => {
    setShowTooltip(false);
    sessionStorage.setItem('rolex_wa_tooltip_shown', 'true');
  };

  const generateWhatsAppMessage = () => {
    const text = `السلام عليكم ورحمة الله، بغيت نطلب ساعة روليكس الفضية (ROLEX Silver Edition) ⌚\n\n` +
      `• الموديل المختار: ${selectedVariation.nameAr} (${selectedVariation.colorName})\n` +
      `• الثمن: ${selectedVariation.price} درهم مغربي\n` +
      `• التوصيل: فابور ومجاني لجميع المدن المغربية 🇲🇦\n` +
      `• الدفع: عند الاستلام ومعاينة الساعة أولاً\n\n` +
      `عفاك بغيت نأكد الطلب ديالي مع فريق المبيعات.`;
    return encodeURIComponent(text);
  };

  const handleWhatsAppClick = () => {
    onFirePixel('InitiateCheckout', {
      channel: 'whatsapp_floating_button',
      variation_id: selectedVariation.id,
      variation_name: selectedVariation.nameAr,
      price: selectedVariation.price
    });

    sendOrderToGoogleSheets({
      selectedWatch: `${selectedVariation.nameAr} (${selectedVariation.colorName})`,
      price: selectedVariation.price,
      source: 'WhatsApp Floating Button CTA'
    });

    const waUrl = `https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 text-right pointer-events-none">
      {/* Floating Tooltip / Badge Preview */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            role="status"
            aria-live="polite"
            className="pointer-events-auto bg-slate-900/95 border border-emerald-500/30 text-white rounded-2xl p-3 shadow-2xl backdrop-blur-md max-w-[250px] sm:max-w-[270px] relative text-xs space-y-1.5"
            id="whatsapp-floating-tooltip"
          >
            <button
              onClick={handleClose}
              className="absolute top-2 left-2 text-slate-400 hover:text-white p-1 rounded-full cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400"
              title="إغلاق"
              aria-label="إغلاق"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold flex-row-reverse text-[11px] pl-5">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>أطلب مباشرة عبر الواتساب</span>
            </div>

            <p className="text-[11px] text-slate-300 leading-snug">
              تواصل معنا مباشرة وتأكد من الموديل المختار (<span className="text-emerald-400 font-bold">{selectedVariation.colorName}</span>) بـ <span className="font-mono text-emerald-400 font-extrabold">{selectedVariation.price} DH</span>.
            </p>

            <div className="flex items-center gap-1 text-[10px] text-slate-400 flex-row-reverse pt-1 border-t border-slate-800/80">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>رد سريع + توصيل فابور فاللمس</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.button
        onClick={handleWhatsAppClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto group relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.35)] cursor-pointer border border-emerald-400/50 flex-row-reverse"
        id="whatsapp-floating-btn"
      >
        {/* Pulse ring animation behind button */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        {/* WhatsApp Icon Container */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white" />
        </div>

        {/* Button Label */}
        <div className="flex flex-col text-right leading-tight">
          <span className="text-[11px] sm:text-xs font-black tracking-wide">أطلب عبر الواتساب</span>
          <span className="text-[9px] text-emerald-100/90 font-mono font-bold">إجابة فورية 24/7</span>
        </div>
      </motion.button>
    </div>
  );
}
