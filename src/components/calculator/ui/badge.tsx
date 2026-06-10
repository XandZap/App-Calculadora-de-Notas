interface BadgeProps {
  label: string;
  color: "emerald" | "purple" | "amber";
}

const colorMap = {
  emerald: "bg-emerald-500/13 text-emerald-400",
  purple: "bg-purple-500/13 text-purple-400",
  amber: "bg-amber-500/13 text-amber-400",
};

export function Badge({ label, color }: BadgeProps) {
  return (
    <span
      className={`w-[34px] h-[34px] rounded-[9px] inline-flex items-center justify-center text-[11px] font-extrabold font-sans tracking-wider shrink-0 ${colorMap[color]}`}
    >
      {label}
    </span>
  );
}
