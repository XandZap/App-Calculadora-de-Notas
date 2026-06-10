interface OptionCardProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  subtitle: string;
}

export function OptionCard({
  selected,
  onClick,
  label,
  subtitle,
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-3 sm:px-4 py-[13px] border-2 rounded-[11px] cursor-pointer transition-all duration-200 ${
        selected
          ? "border-[#14b8a6] bg-[rgba(20,184,166,0.1)] text-[#14b8a6]"
          : "border-[#1e2d45] bg-transparent text-[#7a98b8] hover:border-[#2d3d5a]"
      }`}
      aria-pressed={selected}
    >
      <div className="font-sans text-[12px] sm:text-[13px] font-bold leading-snug">
        {label}
      </div>
      <div className="font-sans text-[10px] sm:text-[10.5px] mt-[3px] opacity-70 leading-relaxed">
        {subtitle}
      </div>
    </button>
  );
}
