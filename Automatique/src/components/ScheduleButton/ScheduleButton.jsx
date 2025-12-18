import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

export default function ScheduleButton({
  text = "Schedule a meeting",
  to = "#",
}) {
  return (
    <Link to={to} className="relative inline-block group">
      
      {/* Ombre décalée */}
      <span
        className="
          absolute inset-0
          bg-black
          rounded-full
          translate-x-[3px] translate-y-[3px]
        "
      />

      {/* Bouton principal */}
      <span
        className="
          relative
          flex items-center gap-3
          bg-[#6ED3C2]
          text-black
          font-medium
          px-7 py-3
          rounded-full
          border-2 border-black
          transition-all
          group-hover:translate-x-[1px]
          group-hover:translate-y-[1px]
        "
      >
        {text}
        <ArrowRight size={18} strokeWidth={2} />
      </span>
    </Link>
  );
}
