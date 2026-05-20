import { useReducedMotionPref } from "./MotionContext";

export default function MotionToggle() {
  const { reduced, setReduced } = useReducedMotionPref();
  return (
    <button
      type="button"
      onClick={() => setReduced(!reduced)}
      aria-pressed={reduced}
      title={reduced ? "Enable cinematic motion" : "Reduce motion"}
      className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur transition-colors hover:border-[#FF7043]/60 hover:text-[#FF7043]"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors ${
          reduced ? "bg-[#4CAF50]" : "bg-[#FF7043]"
        }`}
      />
      <span className="hidden sm:inline">{reduced ? "Calm" : "Cinematic"}</span>
    </button>
  );
}
