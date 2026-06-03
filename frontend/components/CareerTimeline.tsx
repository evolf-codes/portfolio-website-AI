import { CAREER_MILESTONES } from "@/lib/career-journey";
import { EDUCATION } from "@/lib/profile";

export function CareerTimeline() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-16">
      <ol className="career-timeline">
        {CAREER_MILESTONES.map((item, index) => (
          <li key={item.id} className="career-timeline__item">
            <div className="career-timeline__marker" aria-hidden="true">
              <span
                className={
                  index === 0
                    ? "career-timeline__dot career-timeline__dot--active"
                    : "career-timeline__dot"
                }
              />
            </div>
            <article className="career-timeline__card">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold text-[var(--ink)]">{item.role}</h2>
                <p className="text-sm font-medium text-[var(--slate)]">{item.period}</p>
              </div>
              <p className="mt-1 text-sm font-medium text-[var(--graphite)]">{item.company}</p>
              {item.location ? (
                <p className="mt-1 text-xs text-[var(--slate)]">{item.location}</p>
              ) : null}
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--slate)]">
                {item.highlights.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--mist)]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      <section className="panel panel--muted mt-4 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-[var(--ink)]">Education</h2>
        <p className="mt-2 text-sm font-medium text-[var(--graphite)]">{EDUCATION.school}</p>
        <p className="mt-1 text-sm text-[var(--slate)]">{EDUCATION.degree}</p>
        <p className="mt-1 text-sm text-[var(--slate)]">{EDUCATION.years}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--slate)]">{EDUCATION.honors}</p>
      </section>
    </div>
  );
}
