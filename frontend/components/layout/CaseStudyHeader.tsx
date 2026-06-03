type Props = {
  eyebrow?: string;
  title: string;
};

export function CaseStudyHeader({ eyebrow = "Case study", title }: Props) {
  return (
    <header>
      <p className="type-eyebrow">{eyebrow}</p>
      <h1 className="type-article-title mt-3">{title}</h1>
    </header>
  );
}
