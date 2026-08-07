import { PhoneCall, MessageCircle, Truck, Award, ShieldAlert, Store } from 'lucide-react';

interface NavbarProps {
  onReplay3DEntrance?: () => void;
}

export default function Navbar({ onReplay3DEntrance }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full" id="main-header">
      {/* Promo Bar */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white font-bold text-[11px] sm:text-xs py-2 px-4 flex justify-between items-center overflow-hidden border-b border-emerald-500/20">
        <div className="flex items-center gap-2 mx-auto animate-pulse">
          <Truck className="w-4 h-4 text-emerald-300" />
          <span>توصيل سريع مجاني لجميع مدن المغرب 🚚 والدفع بعد المعاينة عند الاستلام!</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-slate-950/90 backdrop-blur-md border-b border-zinc-800 py-3.5 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Right: Direct Call / WhatsApp (Highly effective CRO for Morocco) */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/212679998628?text=سلام،%20بغييت%20نسول%20على%20ساعة%20Rolex%20الفاخرة"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-950/40"
              id="nav-whatsapp-btn"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
            <a
              href="tel:0679998628"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-zinc-800 hover:border-zinc-700 text-slate-200 text-xs rounded-full transition-all cursor-pointer font-medium"
              id="nav-phone-btn"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden md:inline">اتصل دابا:</span>
              <span className="font-mono text-[11px] text-emerald-400">0679998628</span>
            </a>
          </div>

          {/* Center: Brand Identity */}
          <div className="flex flex-col items-center select-none text-center">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-serif text-lg sm:text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-emerald-300 to-zinc-200">
                ROLEX
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold -mt-0.5">
              BOUTIQUE MOROCCO
            </span>
          </div>

          {/* Left: 3D Entrance Replay & Trust Indicator */}
          <div className="flex items-center gap-3 text-xs">
            {onReplay3DEntrance && (
              <button
                onClick={onReplay3DEntrance}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:border-amber-500/60 rounded-full font-bold text-[11px] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                title="مشاهدة عرض دخـول المعرض 3D"
                id="replay-3d-btn"
              >
                <Store className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">جولة 3D فالمتجر</span>
              </button>
            )}

            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Award className="w-4 h-4 text-emerald-500" />
              <span className="font-bold">ضمان سنة</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
