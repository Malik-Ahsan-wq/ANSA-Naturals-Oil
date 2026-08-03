import Leaf from "./Leaf";

export default function ProductBottle({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Ambient glow */}
      <div className="absolute inset-0 m-auto w-[78%] aspect-square rounded-full bg-gradient-to-br from-amber-200/40 via-amber-300/30 to-green-200/30 blur-3xl" />

      {/* Floating leaves */}
      <Leaf variant="a" className="absolute -top-4 -left-2 w-16 h-16 sm:w-24 sm:h-24 text-emerald-700/70 rotate-[-30deg] animate-float" />
      <Leaf variant="b" className="absolute top-10 -right-1 w-14 h-14 sm:w-20 sm:h-20 text-green-600/70 rotate-[40deg] animate-float-delay" />
      <Leaf variant="c" className="absolute -bottom-6 left-6 w-14 h-14 sm:w-20 sm:h-20 text-emerald-800/70 rotate-12 animate-float-slow" />
      <Leaf variant="a" className="absolute bottom-12 -right-4 w-12 h-12 sm:w-16 sm:h-16 text-lime-600/60 rotate-[60deg] animate-float-delay" />

      {/* Bottle */}
  
<img src="/ChatGPT_Image_Aug_3__2026__03_02_44_PM-removebg-preview.png" alt="" />
      {/* Floating oil drops */}
      <div className="absolute top-8 right-2 sm:right-6 text-amber-400/80 animate-drift">
        <svg viewBox="0 0 32 76" width="20" height="40" fill="currentColor" aria-hidden="true">
          <path d="M16 2 C20 10 30 18 30 28 C30 38 24 42 16 42 C8 42 2 38 2 28 C2 18 12 10 16 2Z" />
        </svg>
      </div>
      <div className="absolute top-24 left-0 text-amber-400/60 animate-drift-delay">
        <svg viewBox="0 0 32 76" width="14" height="30" fill="currentColor" aria-hidden="true">
          <path d="M16 2 C20 10 30 18 30 28 C30 38 22 42 16 42 C8 42 2 38 2 28 C2 18 12 10 16 2Z" />
        </svg>
      </div>

      {/* Floating badges */}
      <div className="absolute -left-2 sm:-left-6 top-1/3 z-20 rounded-2xl bg-white/90 backdrop-blur px-3 py-2 shadow-lg border border-white/60 animate-float-slow">
        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">100% Organic</p>
        <p className="text-[8px] text-zinc-500">Cold-pressed · Unrefined</p>
      </div>
      <div className="absolute -right-2 sm:-right-6 bottom-1/3 z-20 rounded-2xl bg-white/90 backdrop-blur px-3 py-2 shadow-lg border border-white/60 animate-float-delay">
        <div className="flex items-center gap-1 text-amber-500 text-xs">★★★★★<span className="ml-1 text-[10px] font-bold text-emerald-800">4.9</span></div>
        <p className="text-[8px] text-zinc-500">3,128 loved reviews</p>
      </div>
    </div>
  );
}