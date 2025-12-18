import { ArrowRight } from "lucide-react";

export default function ScheduleSubmit({
    text = "Schedule a meeting",
    type = "button",
    onClick,
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="relative inline-flex items-center gap-3 px-7 py-3 bg-[#6ED3C2] text-black font-medium rounded-full border-2 border-black transition-all hover:translate-x-[1px] hover:translate-y-[1px]"
      >
        {text}
        <ArrowRight size={18} strokeWidth={2} />
      </button>
    );
  }
  