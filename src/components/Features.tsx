import { useState } from 'react';
import { 
  ShieldCheck, Clock, Droplet, Gem, Sparkles, Award, 
  Settings, CheckCircle2 
} from 'lucide-react';
import { motion } from 'motion/react';
import silverFeaturesImg from '../assets/images/rolex_silver_features_1785763565747.jpg';

export default function Features() {
  const mainFeatures = [
    {
      icon: Clock,
      title: 'حركة ميكانيكية أوتوماتيكية',
      titleEn: 'Automatic Movement',
      desc: 'تعتمد الساعة على حركة معصمك للشحن الذاتي دون الحاجة لأي بطارية، مما يوفر انسيابية ودقة بالغة لعقارب الثواني تشبه دقات الساعات السويسرية الأكثر شهرة.'
    },
    {
      icon: ShieldCheck,
      title: 'هيكل متين من Oystersteel الفاخر',
      titleEn: 'Super-alloy Steel Case',
      desc: 'مصنوعة بالكامل من خليط الفولاذ المقاوم للصدأ والخدوش، وهو فولاذ فائق الصلابة يحافظ على لمعانه الفضي البراق وجاذبيته تحت أقسى ظروف الاستخدام اليومي.'
    },
    {
      icon: Gem,
      title: 'زجاج ياقوتي مقاوم للخدش',
      titleEn: 'Sapphire Crystal Glass',
      desc: 'واجهة مغطاة بزجاج الياقوت الكريستالي فائق النقاء لمقاومة الصدمات والخدش التام، مع نافذة محدبة التاريخ (Cyclops Lens) لتكبير وقراءة مريحة.'
    },
    {
      icon: Sparkles,
      title: 'حافة مخددة فضية أيقونية',
      titleEn: 'Classic Fluted Bezel',
      desc: 'تتميز الحافة المخددة بدقة متناهية تعكس الأضواء بطريقة خلابة عند التفاف معصمك، وهي اللمسة الملكية الحصرية التي تميز هيبة ومكانة روليكس.'
    },
    {
      icon: Droplet,
      title: 'مقاومة ممتازة للماء والغبار',
      titleEn: 'Waterproof Integrity',
      desc: 'توضأ بها، اغسل يديك، أو واجه ظروف الأمطار بكل ثقة. تصميم الهيكل محكم الغلق يضمن حماية ميكانيكية متكاملة وعزلاً تاماً للرطوبة.'
    },
    {
      icon: Settings,
      title: 'قفل مطوي ذكي آمن',
      titleEn: 'Luxury Oyster Clasp',
      desc: 'مزودة بسلسلة معدنية كلاسيكية رائعة وقفل أمان مطوي يمنع الانفلات العرضي، مع ميزة التعديل السهل والمريح لمقاس السلسلة على يدك.'
    }
  ];

  return (
    <section className="bg-slate-950 py-20 px-4 sm:px-6 md:px-8 border-b border-zinc-900 overflow-hidden" id="features-section">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase font-extrabold tracking-widest text-emerald-500"
          >
            مواصفات ودقة الصنع الفاخر
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white"
          >
            علاش ساعة <span className="text-emerald-500">ROLEX Silver</span> هي الخيار الأمثل ليك؟
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-400 leading-relaxed"
          >
            تدمج الساعة بين فخامة التصميم السويسري الكلاسيكي وهيكل الفولاذ المقاوم للصدأ المصقول، مع دقة تامة في التفاصيل لتمنحك الهيبة والحضور الفاخر.
          </motion.p>
        </div>

        {/* Big Layout: Image + Feature grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right/Middle: Features Grid (6 items) with Scroll Stagger Effects */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
            {mainFeatures.map((feat, index) => {
              const IconComp = feat.icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -5, borderColor: '#10b981' }}
                  className="bg-slate-900/40 border border-zinc-900 p-5 rounded-2xl space-y-3 hover:border-emerald-500/30 transition-all duration-300 shadow-lg"
                  id={`feature-${index}`}
                >
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 w-fit">
                    <IconComp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="space-y-1 text-right">
                    <h4 className="font-bold text-white text-base flex items-center gap-2 justify-end">
                      <span className="text-[10px] text-zinc-500 font-mono tracking-wider">({feat.titleEn})</span>
                      <span>{feat.title}</span>
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Left/Middle: Macro Feature Image Close-up (5 cols) with entrance slide-in */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-center items-center order-1 lg:order-2"
          >
            <div className="relative max-w-md w-full rounded-2xl overflow-hidden border border-zinc-850 p-1 bg-slate-950/60">
              <div className="absolute inset-0 bg-radial from-emerald-500/5 to-transparent rounded-2xl" />
              
              <img 
                src={silverFeaturesImg}
                alt="Rolex Silver Watch fluted bezel close-up detail"
                className="w-full object-cover aspect-[4/3] rounded-xl hover:scale-103 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                id="feature-macro-image"
              />

              <div className="p-4 relative bg-slate-950/90 border-t border-zinc-800 rounded-b-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
                  <span>سويسري الصنع بضمان مغربي كامل</span>
                  <Award className="w-3.5 h-3.5" />
                </span>
                <p className="text-xs text-slate-300 leading-relaxed text-right">
                  مقاوم للصدأ من طراز Oyster Steel، مع حافة مخددة فخمة وتاج دوار مصقول يعبر عن الأصالة والهيبة والذوق الرفيع.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* COMPARISON CHART: ROLEX VS REPLICAS (Massive CRO Booster) with smooth scroll up */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="bg-slate-900/30 border border-zinc-850 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto space-y-6 shadow-2xl" 
          id="comparison-section"
        >
          
          <div className="text-center space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              مقارنة الجودة والأصالة فالسوق المغربي
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              رد بالك! ماشي أي ساعة معروضة فالفيس بوك كتشابه
            </h3>
            <p className="text-xs text-slate-400">
              قارن جودة ومواصفات ساعة <span className="text-white font-bold">ROLEX Silver</span> الأصلية مع النسخ المقلدة الرخيصة
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-slate-400">
                  <th className="pb-3 text-right">الميزة والمواصفات</th>
                  <th className="pb-3 text-center text-emerald-400 font-bold bg-emerald-500/5 px-4 rounded-t-xl">ساعة ROLEX الفضية الأصلية</th>
                  <th className="pb-3 text-center text-slate-500">النسخ المقلدة الرخيصة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-slate-300">
                <tr>
                  <td className="py-4 font-bold text-slate-200">هيكل الساعة الخارجي</td>
                  <td className="py-4 text-center text-emerald-400 font-semibold bg-emerald-500/5 px-4">فولاذ Oyster Steel فضي صلب مضاد للخدش والصدأ</td>
                  <td className="py-4 text-center text-slate-500">بلاستيك أو ألمنيوم رديء كيتقشر مع الوقت</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-200">زجاج الواجهة والعدسة</td>
                  <td className="py-4 text-center text-emerald-400 font-semibold bg-emerald-500/5 px-4">زجاج ياقوتي (Sapphire) مضاد للخدش مع عدسة التاريخ المكبرة</td>
                  <td className="py-4 text-center text-slate-500">زجاج عادي رخيص كيتخبش وكيتهرس مع أبسط صدمة</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-200">الحركة والمكينة الداخلية</td>
                  <td className="py-4 text-center text-emerald-400 font-semibold bg-emerald-500/5 px-4">حركة ميكانيكية أوتوماتيكية دقيقة بدون بطارية مع حركة انسيابية مذهلة</td>
                  <td className="py-4 text-center text-slate-500">مكينة كوارتز صينية ببطارية تتوقف فجأة وتفقد دقتها</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-200">مقاومة الماء والرطوبة</td>
                  <td className="py-4 text-center text-emerald-400 font-semibold bg-emerald-500/5 px-4">مقاومة تامة لتسرب الماء والغبار اليومي لضمان حماية المكينة</td>
                  <td className="py-4 text-center text-slate-500">تتلف فوراً مع غسيل اليدين أو عند التعرض لأبسط قطرات ماء</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-200">خدمة الضمان والزبناء</td>
                  <td className="py-4 text-center text-emerald-400 font-semibold bg-emerald-500/5 px-4 rounded-b-xl">ضمان حقيقي لمدة سنة مع خدمة الرد على واتساب 24/7</td>
                  <td className="py-4 text-center text-slate-500">لا يوجد ضمان، ملي كتخسر الساعة كيبلوكيك البائع</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-slate-950 rounded-xl border border-zinc-800 text-xs text-right">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-slate-300">كنأكدو ليك بلي كتوصلك الساعة <strong>بالضبط بحال اللي فالصور والفيديو</strong> أولا رجع فلوسك.</span>
            </div>
            <span className="text-emerald-400 font-bold shrink-0">الثقة هي شعارنا الرئيسي فالمغرب 🤝</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
