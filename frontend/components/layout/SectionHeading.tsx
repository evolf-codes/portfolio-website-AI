import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  as?: "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  className = "",
}: Props) {
  return (
    <header className={`section-heading ${className}`.trim()}>
      {eyebrow ? <p className="type-eyebrow">{eyebrow}</p> : null}
      <Tag className="type-section-title">{title}</Tag>
      {description ? <p className="type-section-desc">{description}</p> : null}
    </header>
  );
}
