type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="page-hero">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        {eyebrow ? (
          <p className="page-hero__eyebrow text-xs font-semibold tracking-[0.2em] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="page-hero__title mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="page-hero__description mt-5 max-w-2xl text-base leading-relaxed md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
