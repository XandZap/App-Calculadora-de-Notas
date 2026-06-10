import { useCallback } from "react";

interface NumberInputProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  hint?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  step = 0.1,
  disabled = false,
  hint,
}: NumberInputProps) {
  const handleWheel = useCallback((e: React.WheelEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).blur();
  }, []);

  return (
    <div className={disabled ? "opacity-40" : "opacity-100"}>
      <div className="flex justify-between items-baseline mb-[7px]">
        <label className="text-[10.5px] font-bold text-[#4d6a88] uppercase tracking-[0.13em] font-sans">
          {label}
        </label>
        <span className="text-[10px] text-[#4d6a88]/60 font-sans">
          {min} – {max}
        </span>
      </div>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "") {
            onChange(null);
            return;
          }
          const parsed = parseFloat(val);
          if (!isNaN(parsed)) {
            const clamped = Math.min(Math.max(parsed, min), max);
            onChange(Math.round(clamped * 10) / 10);
          }
        }}
        onWheel={handleWheel}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        placeholder="—"
        className="w-full bg-[#080d1a] border-2 border-[#1e2d45] rounded-[10px] px-[14px] py-[11px] text-[30px] font-bold font-mono text-[#e2e8f0] outline-none transition-all duration-180 focus:border-[#8b5cf6] hover:border-[#2d3d5a] disabled:border-[#1a2030] disabled:text-[#1e2d45] disabled:cursor-not-allowed"
        aria-label={label}
      />
      {hint && (
        <p className="font-sans text-[11px] text-[#7a98b8] mt-2 leading-relaxed">
          {hint}
        </p>
      )}
    </div>
  );
}
