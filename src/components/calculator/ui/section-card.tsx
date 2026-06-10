import type { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export function SectionCard({ children, className = "" }: SectionCardProps) {
  return (
    <div
      className={`bg-[#111827] border border-[#1e2d45] rounded-[16px] p-4 sm:p-5 lg:p-6 card-glow ${className}`}
    >
      {children}
    </div>
  );
}
