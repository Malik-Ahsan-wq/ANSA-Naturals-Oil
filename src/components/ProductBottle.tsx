import Image from "next/image";
import Leaf from "./Leaf";

const PRODUCT_IMG = "/assets/ansanaturalsheroimage.png";

export default function ProductBottle({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Ambient glow */}
      <div className="absolute inset-0 m-auto w-[78%] aspect-square rounded-full bg-gradient-to-br from-amber-200/40 via-amber-300/30 to-zinc-200/30 blur-3xl" />

      {/* Floating leaves */}
      <Leaf variant="a" className="absolute -top-4 -left-2 w-16 h-16 sm:w-20 sm:h-20 text-zinc-500/60 rotate-[-30deg] animate-float" />
      <Leaf variant="b" className="absolute top-10 -right-1 w-14 h-14 sm:w-18 sm:h-18 text-zinc-600/60 rotate-[40deg] animate-float-delay" />

      {/* Bottle product shot */}
      <div className="relative z-10 w-full max-w-[360px] mx-auto" style={{ aspectRatio: "408 / 612" }}>
        <Image
          src={PRODUCT_IMG}
          alt="ANSA Naturals Pure Organic Hair Oil bottle"
          fill
          sizes="(max-width: 768px) 60vw, 30vw"
          priority
          className="object-contain drop-shadow-[0_35px_35px_rgba(20,60,40,0.35)]"
        />
        {/* Ground shadow */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/5 h-5 rounded-full bg-zinc-900/20 blur-md" />
      </div>

      {/* Floating oil drops */}
      <div className="absolute top-8 right-2 sm:right-6 z-20 text-amber-400/70 animate-drift">
        <svg viewBox="0 0 32 76" width="18" height="36" fill="currentColor" aria-hidden="true">
          <path d="M16 2 C20 10 30 18 30 28 C30 38 24 42 16 42 C8 42 2 38 2 28 C2 18 12 10 16 2Z" />
        </svg>
      </div>

      {/* Floating badges */}
      <div className="absolute -left-2 sm:-left-6 top-1/3 z-20 rounded-2xl bg-white/90 backdrop-blur px-3 py-2 shadow-lg border border-white/60 animate-float-slow">
        <p className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">100% Organic</p>
        <p className="text-[8px] text-zinc-500">Cold-pressed · Unrefined</p>
      </div>
    </div>
  );
}