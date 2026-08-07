import { useState } from 'react';
import { FAQS } from '../data';
import { 
  HelpCircle, ChevronDown, ChevronUp, ShieldCheck, 
  RefreshCw, Lock, Clock, Mail, PhoneCall, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-right text-xs text-slate-400" id="footer-section">
      
      {/* 1. FAQS Accordion (Crucial for conversions to resolve buyer friction) */}
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 md:px-8 border-b border-zinc-900" id="faq-section">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <HelpCircle className="w-8 h-8 text-emerald-500 mx-auto" />
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">الأسئلة الشائعة حول الساعة</h3>
          <p className="text-xs text-slate-500">إليك الأجوبة على كاع الأسئلة اللي تقدر طيح ليك فبالك</p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="bg-slate-900/40 border border-slate-900 rounded-2xl overflow-hidden transition-all duration-150"
                id={`faq-item-${index}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 flex justify-between items-center flex-row-reverse text-right text-white font-bold text-sm sm:text-base cursor-pointer focus:outline-none"
                >
                  <span className="text-xs sm:text-sm">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-950 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Middle Footer: Guarantees & Contact */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-900">
        
        {/* Contact info */}
        <div className="space-y-4 text-center md:text-right">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">تواصل معنا 📞</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            فريق خدمة العملاء فالمغرب في خدمتكم على مدار الساعة للإجابة على كاع التساؤلات أو لتأكيد طلبياتكم.
          </p>
          <div className="space-y-2 text-xs text-slate-300 flex flex-col items-center md:items-end">
            <a href="tel:0679998628" className="flex items-center gap-2 hover:text-emerald-500 transition-colors font-mono">
              <span>0679998628</span>
              <PhoneCall className="w-4 h-4 text-emerald-500" />
            </a>
            <a href="mailto:support@rolex-morocco.com" className="flex items-center gap-2 hover:text-emerald-500 transition-colors font-mono">
              <span>support@rolex-morocco.com</span>
              <Mail className="w-4 h-4 text-emerald-500" />
            </a>
          </div>
        </div>

        {/* Brand identity & Mission statement */}
        <div className="space-y-4 text-center md:text-right md:border-x border-zinc-900 md:px-8">
          <div className="flex items-center gap-1.5 justify-center md:justify-end">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-emerald-300 to-zinc-200">
              ROLEX SILVER SPECIAL EDITION
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            نحن ملتزمون بتقديم أرقى وأجود الساعات الذكية ذات الطابع الكلاسيكي الفخم في المغرب. رضاكم وثقتكم هي غايتنا الأولى والوحيدة. الدفع عند الاستلام والتوصيل دائماً مجاني.
          </p>
        </div>

        {/* Trust Seal details */}
        <div className="space-y-4 text-center md:text-right">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">شراء آمن %100 🛡️</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            تتم معالجة جميع المعلومات الشخصية المسجلة في استمارات الشراء بأمان وسرية تامة لغايات شحن وتوصيل ساعتك فقط.
          </p>
          <div className="flex justify-center md:justify-end gap-3 text-slate-500">
            <Lock className="w-5 h-5 text-emerald-500/40" />
            <ShieldCheck className="w-5 h-5 text-emerald-500/40" />
            <RefreshCw className="w-5 h-5 text-emerald-500/40" />
            <Clock className="w-5 h-5 text-emerald-500/40" />
          </div>
        </div>

      </div>

      {/* 3. Bottom Credits & Tracking placeholders notes */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row-reverse items-center justify-between gap-4 text-[10px] text-slate-600">
        
        {/* Moroccan standard notices */}
        <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
          <a href="#" className="hover:text-slate-400 transition-colors">شروط الاستخدام</a>
          <span>•</span>
          <a href="#" className="hover:text-slate-400 transition-colors">سياسة الخصوصية</a>
          <span>•</span>
          <a href="#" className="hover:text-slate-400 transition-colors">سياسة الإرجاع والتبديل</a>
        </div>

        <p className="text-center sm:text-right">
          جميع الحقوق محفوظة © {new Date().getFullYear()} ROLEX Silver Edition Morocco.
          <br />
          مطور ومصمم ليكون من أعلى صفحات الهبوط تحويلاً فالمغرب. 🇲🇦
        </p>

      </div>

      {/* ═════════════════════════════════════════════════════════════
          TRACKING TAGS PLACEHOLDERS
          This is where you would place production pixel scripts.
          These placeholders are integrated dynamically within our React flow via the simulated PortfolioInspector.
          
          {/*
          <!-- Facebook Pixel Code -->
          <script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_FACEBOOK_PIXEL_ID'); // PLACEHOLDER
            fbq('track', 'PageView');
          </script>
          
          <!-- TikTok Pixel Code -->
          <script>
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var tt=w[t]=w[t]||[];tt.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","trackWithSegmentHtml","analytics","setAnonymousId"],tt.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<tt.methods.length;i++)tt.setAndDefer(tt,tt.methods[i]);tt.instance=function(t){for(var e=tt._i[t]||[],n=0;n<tt.methods.length;n++)tt.setAndDefer(e,tt.methods[n]);return e},tt.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";tt._i=tt._i||{},tt._i[e]=[],tt._i[e]._u=i,w[t]._k=e,w[t]._t=w[t]._t||{};var o=null;w[t]._t[e]=+new Date;o=d.createElement("script"),o.type="text/javascript",o.async=!0,o.src=i;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              tt.load('YOUR_TIKTOK_PIXEL_ID'); // PLACEHOLDER
              tt.page();
            }(window, document, 'ttq');
          </script>
          
          <!-- Google Analytics (gtag.js) -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_TRACKING_ID"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA_TRACKING_ID'); // PLACEHOLDER
          </script>
          ═════════════════════════════════════════════════════════════ */}
    </footer>
  );
}
