import { SITE_TAGLINE, SITE_TITLE } from "@/lib/site";

export function HomeIntro() {
  return (
    <section className="page-hero page-hero--home">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="page-hero__eyebrow text-xs font-semibold tracking-[0.25em] uppercase">
          Portfolio
        </p>
        <h1 className="home-intro__name mt-4 max-w-4xl">Eric Volfson</h1>
        <p className="home-intro__title mt-4 text-lg font-medium md:text-xl">{SITE_TITLE}</p>
        <p className="home-intro__tagline mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
          {SITE_TAGLINE}
        </p>
      </div>
    </section>
  );
}
