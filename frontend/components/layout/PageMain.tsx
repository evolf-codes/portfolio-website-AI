import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Reading-width column for case studies and articles */
  narrow?: boolean;
  className?: string;
};

export function PageMain({ children, narrow = false, className = "" }: Props) {
  const width = narrow ? "max-w-3xl" : "max-w-6xl";
  return (
    <div
      className={`page-main mx-auto px-6 pb-16 md:pb-20 ${width} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
