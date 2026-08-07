import { useState, useRef, RefObject, FormEvent } from 'react';
import { WatchVariation, Order } from '../types';
import { MOROCCAN_CITIES } from '../data';
import { 
  ShieldCheck, ShoppingCart, User, Phone, MapPin, 
  Truck, ArrowRight, CheckCircle2, Gift, MessageCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutProps {
  selectedVariation: WatchVariation;
  onAddOrder: (order: Order) => void;
  onFirePixel: (eventName: 'PageView' | 'AddToCart' | 'InitiateCheckout' | 'Purchase', payload?: Record<string, any>) => void;
  checkoutRef: RefObject<HTMLDivElement | null>;
}

export default function Checkout({
  selectedVariation,
  onAddOrder,
  onFirePixel,
  checkoutRef
}: CheckoutProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(MOROCCAN_CITIES[0].name);
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate prices based on quantity bundle
  // 1 Watch: 399 DH
  // 2 Watches: 699 DH (Save 100 DH)
  // 3 Watches: 999 DH (Save 200 DH)
  const getPricing = () => {
    if (quantity === 1) return { total: selectedVariation.price, savings: 0 };
    if (quantity === 2) return { total: 699, savings: 100 };
    return { total: 999, savings: 200 };
  };

  const { total, savings } = getPricing();

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (fullName.trim().length < 4) {
      newErrors.fullName = 'المرجو إدخال الإسم الكامل (على الأقل 4 حروف)';
    }

    // Moroccan phone regex (starts with 05, 06 or 07, total 10 digits, or +212)
    const phoneClean = phone.replace(/\s+/g, '');
    const phoneRegex = /^(05|06|07|01)\d{8}$|^(\+212)\d{9}$/;
    
    if (!phoneRegex.test(phoneClean)) {
      newErrors.phone = 'المرجو إدخال رقم هاتف مغربي صحيح (مثال: 0612345678)';
    }

    if (address.trim().length < 8) {
      newErrors.address = 'المرجو إدخال العنوان الكامل لضمان دقة التوصيل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      onFirePixel('InitiateCheckout', { error: 'validation_failed', form: 'checkout_fields' });
      return;
    }

    setIsSubmitting(true);

    // Simulate database write latency
    setTimeout(() => {
      const orderId = 'ORD_' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const newOrder: Order = {
        id: orderId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        city,
        address: address.trim(),
        variationId: selectedVariation.id,
        variationName: `${selectedVariation.name} (Strap: ${selectedVariation.strapNameAr})`,
        quantity,
        totalPrice: total,
        status: 'new',
        timestamp: new Date().toISOString()
      };

      onAddOrder(newOrder);
      setLatestOrder(newOrder);
      setIsSuccess(true);
      setIsSubmitting(false);

      // Fire conversion pixel!
      onFirePixel('Purchase', {
        transaction_id: orderId,
        value: total,
        currency: 'MAD',
        quantity,
        item_name: selectedVariation.name,
        city
      });
    }, 1200);
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setAddress('');
    setQuantity(1);
    setIsSuccess(false);
    setLatestOrder(null);
  };

  return (
    <div 
      ref={checkoutRef} 
      className="bg-slate-900 py-20 px-4 sm:px-6 md:px-8 border-b border-slate-900 scroll-mt-24" 
      id="checkout-section"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 flex items-center justify-center gap-1">
            <Truck className="w-4 h-4" />
            التوصيل فابور والدفع عند الاستلام
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            عمر معلوماتك وأكد طلبك دابا
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            المرجو إدخال معلوماتك الشخصية بدقة. سنتصل بك هاتفياً في أقل من 24 ساعة لتأكيد المقاس وإرسال طلبك.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl relative"
            >
              
              {/* Form Column (7 cols) */}
              <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-5 text-right order-2 lg:order-1" id="order-form">
                
                {/* 1. Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 justify-end">
                    <span>الإسم الكامل (اللقب والإسم الشخصي):</span>
                    <User className="w-3.5 h-3.5 text-emerald-500" />
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: أمين بنجلون"
                    className={`w-full bg-slate-900 border ${errors.fullName ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:ring-emerald-500/20'} rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-4 transition-all text-right`}
                    disabled={isSubmitting}
                    id="checkout-fullname"
                  />
                  {errors.fullName && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1 justify-end mt-1 font-bold">
                      <span>{errors.fullName}</span>
                      <AlertCircle className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* 2. Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 justify-end">
                    <span>رقم الهاتف الخاص بك (ضروري جداً):</span>
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: 0612345678"
                    className={`w-full bg-slate-900 border ${errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:ring-emerald-500/20'} rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-4 transition-all text-left font-mono`}
                    disabled={isSubmitting}
                    id="checkout-phone"
                  />
                  <p className="text-[9px] text-slate-500 text-right leading-tight">
                    * تأكد من كتابة الرقم صحيح لكي يتصل بك الموزع لتسليم الساعة.
                  </p>
                  {errors.phone && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1 justify-end mt-1 font-bold">
                      <span>{errors.phone}</span>
                      <AlertCircle className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* 3. City Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 justify-end">
                    <span>اختر المدينة:</span>
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  </label>
                  <select
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      onFirePixel('InitiateCheckout', { action: 'select_city', value: e.target.value });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all text-right cursor-pointer"
                    disabled={isSubmitting}
                    id="checkout-city"
                  >
                    {MOROCCAN_CITIES.map((c, i) => (
                      <option key={i} value={c.name} className="bg-slate-950">
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <div className="text-[10px] text-emerald-400 bg-emerald-900/10 border border-emerald-950 px-2.5 py-1.5 rounded-lg flex items-center justify-between flex-row-reverse mt-1">
                    <span className="font-bold">التوصيل لـ {city.split(' ')[0]} مجاني 100% فابور! 🚚</span>
                    <span className="font-semibold text-[9px] uppercase font-mono">FREE SHIPPING</span>
                  </div>
                </div>

                {/* 4. Full Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 justify-end">
                    <span>العنوان السكني الكامل بالتفصيل:</span>
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="مثال: حي السلام، شارع المقاومة، عمارة 4، شقة 10، وجدة"
                    rows={2}
                    className={`w-full bg-slate-900 border ${errors.address ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-800 focus:ring-emerald-500/20'} rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-4 transition-all text-right`}
                    disabled={isSubmitting}
                    id="checkout-address"
                  />
                  {errors.address && (
                    <span className="text-[10px] text-red-400 flex items-center gap-1 justify-end mt-1 font-bold">
                      <span>{errors.address}</span>
                      <AlertCircle className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* ⚠️ Explicit COD Notice (Huge CRO value for Morocco) */}
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-400 text-right leading-relaxed">
                  🔒 <strong className="text-white">أمان تام وضمانة مريحة:</strong> لن تدفع أي سنت الآن! الدفع يكون نقدًا فقط بعد أن تتوصل بساعتك، تفتح الصندوق، وتفحص جودة ومواصفات الساعة بنفسك وتجربها.
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-base sm:text-lg rounded-xl shadow-2xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  id="checkout-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>جاري إرسال طلبك الآمن...</span>
                    </>
                  ) : (
                    <>
                      <span>أكد الطلب الآن (الدفع عند الاستلام)</span>
                      <ArrowRight className="w-5 h-5 text-slate-950" />
                    </>
                  )}
                </button>

              </form>

              {/* Order Summary & Upsell Column (5 cols) */}
              <div className="lg:col-span-5 bg-slate-900/50 p-6 rounded-2xl border border-zinc-850 flex flex-col justify-between space-y-6 order-1 lg:order-2 text-right">
                
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-300 border-b border-zinc-800 pb-2 flex items-center gap-1.5 justify-end">
                    <span>تفاصيل طلبيتك</span>
                    <ShoppingCart className="w-4 h-4 text-emerald-500" />
                  </h4>

                  {/* Chosen Variant details */}
                  <div className="flex items-center gap-3 justify-end flex-row-reverse">
                    <img 
                      src={selectedVariation.image} 
                      alt={selectedVariation.name} 
                      className="w-16 h-16 object-contain rounded-lg bg-slate-950 border border-zinc-800 shrink-0"
                    />
                    <div className="text-right">
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold inline-block mb-1">
                        {selectedVariation.colorName}
                      </span>
                      <h5 className="font-bold text-white text-xs">{selectedVariation.nameAr}</h5>
                      <p className="text-[10px] text-slate-400 mt-0.5">سير الساعة: {selectedVariation.strapNameAr}</p>
                    </div>
                  </div>

                  {/* Bundle Quantity Selector (AOV Booster) */}
                  <div className="space-y-2 border-t border-zinc-800 pt-3">
                    <span className="text-xs font-bold text-emerald-500 block">العروض الترويجية المتاحة (اختر الكمية):</span>
                    
                    <div className="space-y-2.5">
                      {/* Bundle 1 */}
                      <button
                        type="button"
                        onClick={() => setQuantity(1)}
                        className={`w-full p-2.5 text-right rounded-xl border flex items-center justify-between flex-row-reverse transition-all cursor-pointer ${
                          quantity === 1 
                            ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold' 
                            : 'bg-slate-950/60 border-zinc-900 text-slate-400 hover:border-zinc-800'
                        }`}
                        id="bundle-1"
                      >
                        <span className="text-xs">ساعة واحدة (لك فقط)</span>
                        <span className="font-mono text-xs font-bold text-white">399 DH</span>
                      </button>

                      {/* Bundle 2 (AOV Upsell!) */}
                      <button
                        type="button"
                        onClick={() => setQuantity(2)}
                        className={`w-full p-2.5 text-right rounded-xl border flex items-center justify-between flex-row-reverse transition-all relative cursor-pointer ${
                          quantity === 2 
                            ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold' 
                            : 'bg-slate-950/60 border-zinc-900 text-slate-400 hover:border-zinc-800'
                        }`}
                        id="bundle-2"
                      >
                        <span className="absolute -top-2 left-3 bg-red-600 text-white font-black text-[8px] px-1.5 py-0.2 rounded-full uppercase animate-bounce">
                          الأكثر طلباً وموفراً! 🔥
                        </span>
                        <div className="text-right">
                          <span className="text-xs block">2 ساعات (ليك ولصاحبك/للزوجة)</span>
                          <span className="text-[10px] text-emerald-400 font-bold block">وفرتي 100 درهم كاملة!</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-white">699 DH</span>
                      </button>

                      {/* Bundle 3 */}
                      <button
                        type="button"
                        onClick={() => setQuantity(3)}
                        className={`w-full p-2.5 text-right rounded-xl border flex items-center justify-between flex-row-reverse transition-all cursor-pointer ${
                          quantity === 3 
                            ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold' 
                            : 'bg-slate-950/60 border-zinc-900 text-slate-400 hover:border-zinc-800'
                        }`}
                        id="bundle-3"
                      >
                        <div className="text-right">
                          <span className="text-xs block">3 ساعات (العائلة والوقار)</span>
                          <span className="text-[10px] text-emerald-400 font-bold block">وفرتي 200 درهم كاملة!</span>
                        </div>
                        <span className="font-mono text-xs font-bold text-white">999 DH</span>
                      </button>

                    </div>
                  </div>

                  {/* Calculations breakdown */}
                  <div className="border-t border-slate-800/80 pt-3 space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between flex-row-reverse">
                      <span>ثمن السلعة الصافي:</span>
                      <span className="text-white font-mono">{quantity === 1 ? '399' : quantity === 2 ? '798' : '1197'} DH</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between flex-row-reverse text-emerald-400">
                        <span>قيمة التخفيض الخاص (Bundle):</span>
                        <span className="font-mono">-{savings} DH</span>
                      </div>
                    )}
                    <div className="flex justify-between flex-row-reverse text-emerald-400 font-bold">
                      <span>مصاريف الشحن والتوصيل فالمغرب:</span>
                      <span className="line-through font-mono text-slate-500">45 DH</span>
                      <span>0 DH (مجاني)</span>
                    </div>
                  </div>

                </div>

                {/* Final Total Area */}
                <div className="bg-slate-950 p-4 rounded-xl border border-zinc-800/60 space-y-2 mt-auto">
                  <div className="flex justify-between items-center flex-row-reverse">
                    <span className="font-bold text-white text-sm">المجموع النهائي للدفع عند الاستلام:</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">{total} DH</span>
                  </div>
                  
                  {/* Trust check badge */}
                  <div className="flex items-center gap-1.5 justify-end text-[10px] text-slate-400">
                    <span>الضمانة السنوية مفعلة لطلبك تلقائياً</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>

              </div>

            </motion.div>
          ) : (
            /* Order Success Modal - High Converting Confirmation */
            <motion.div
              key="checkout-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-950 border border-emerald-500/20 rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-6 shadow-2xl relative"
            >
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full w-fit mx-auto border border-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">تبارك الله عليك! تم استقبال طلبك بنجاح 🎉</h3>
                <p className="text-sm text-slate-300">
                  شكراً على ثقتك فـ <strong className="text-emerald-400">ROLEX Silver Edition</strong>. لقد قمنا بتسجيل معلوماتك في نظامنا الفوري.
                </p>
              </div>

              {/* Display submitted values inside success window to prove it works */}
              {latestOrder && (
                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-right space-y-2 max-w-md mx-auto text-xs">
                  <div className="flex justify-between flex-row-reverse text-[10px] text-slate-500">
                    <span>رقم تتبع الطلب: <strong className="font-mono text-slate-400">{latestOrder.id}</strong></span>
                    <span>تاريخ الطلب: الآن</span>
                  </div>
                  <div className="border-t border-slate-950 pt-2 space-y-1 text-slate-300">
                    <p>• <strong className="text-white">الإسم الكامل:</strong> {latestOrder.fullName}</p>
                    <p>• <strong className="text-white">رقم الهاتف:</strong> {latestOrder.phone}</p>
                    <p>• <strong className="text-white">المدينة المستهدفة:</strong> {latestOrder.city}</p>
                    <p>• <strong className="text-white">العنوان:</strong> {latestOrder.address}</p>
                    <p>• <strong className="text-white">المنتج والكمية:</strong> {latestOrder.variationName} (عدد {latestOrder.quantity})</p>
                    <p className="border-t border-slate-950 pt-1 text-emerald-400 font-bold">
                      • <strong className="text-white">المجموع الصافي للدفع:</strong> {latestOrder.totalPrice} DH
                    </p>
                  </div>
                </div>
              )}

              {/* Urgent Call-to-action to bypass delay and auto-confirm over WhatsApp */}
              <div className="bg-emerald-500/5 border border-emerald-500/15 p-5 rounded-2xl space-y-3 max-w-md mx-auto">
                <div className="flex items-center gap-1.5 justify-center text-xs font-bold text-emerald-400">
                  <Gift className="w-4 h-4 text-emerald-400 animate-bounce" />
                  <span>أكد طلبك فورا عبر WhatsApp لتحصل على الأولوية فالتوصيل!</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  بسبب الطلب الكبير اليوم، تأكيد طلبك عبر الواتساب يمنحك التوصيل السريع فـ 24 ساعة فقط وحماية إضافية مجانية!
                </p>
                <a
                  href={`https://wa.me/212600000000?text=${encodeURIComponent(
                    `سلام عليكم، قمت بطلب ساعة روليكس الفضية الفاخرة.\n\nمعلومات طلبي:\n- الإسم الكامل: ${latestOrder?.fullName}\n- الهاتف: ${latestOrder?.phone}\n- المدينة: ${latestOrder?.city}\n- المنتج: ${latestOrder?.variationName}\n- الكمية: ${latestOrder?.quantity}\n- المجموع: ${latestOrder?.totalPrice} DH\n\nالمرجو تأكيد الإرسال فابور وشكرا!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-103 shadow-lg shadow-emerald-950/40 text-center"
                  id="checkout-success-whatsapp-btn"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>تأكيد الطلب فوري عبر WhatsApp</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetForm}
                  className="text-xs text-slate-500 hover:text-slate-300 underline transition-colors cursor-pointer"
                  id="checkout-success-reset-btn"
                >
                  الرجوع لصفحة الشراء / طلب ساعة أخرى
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
