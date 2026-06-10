"use client";

import type { ReactNode } from "react";
import { Badge } from "./badge";
import { NumberInput } from "./number-input";
import { SectionCard } from "./section-card";

interface GradeInput {
  label: string;
  value: number | null;
  onChange: (v: number | null) => void;
  min?: number;
  max?: number;
  hint?: string;
}

interface GradeSectionProps {
  badge: { label: string; color: "emerald" | "purple" | "amber" };
  title: string;
  subtitle?: string;
  inputs: GradeInput[];
  bottomBlock?: ReactNode;
}

export function GradeSection({
  badge,
  title,
  subtitle,
  inputs,
  bottomBlock,
}: GradeSectionProps) {
  return (
    <SectionCard>
      <div className="flex items-center gap-[11px] mb-[18px]">
        <Badge label={badge.label} color={badge.color} />
        <div className="flex-1">
          <p className="text-[14.5px] font-semibold font-sans text-[#e2e8f0] m-0">
            {title}
          </p>
          {subtitle && (
            <p className="text-[11px] text-[#4d6a88] font-sans m-0 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {inputs.map((input, i) => (
          <NumberInput
            key={i}
            label={input.label}
            value={input.value}
            onChange={input.onChange}
            min={input.min ?? 0}
            max={input.max ?? 10}
            step={0.1}
            hint={input.hint}
          />
        ))}
      </div>
      {bottomBlock && (
        <div className="mt-4 pt-4 border-t border-[#1e2d45]">
          {bottomBlock}
        </div>
      )}
    </SectionCard>
  );
}
