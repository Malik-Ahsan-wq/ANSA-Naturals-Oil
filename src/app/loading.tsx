export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#fafafa]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-zinc-200" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#111111] animate-spin" />
        </div>
        <p className="text-sm font-semibold text-zinc-500 tracking-wide">Loading...</p>
      </div>
    </div>
  );
}
