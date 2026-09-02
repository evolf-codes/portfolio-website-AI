import { PageMain } from "@/components/layout/PageMain";
import { PanelHeading } from "@/components/layout/PanelHeading";
import { CAREER_MILESTONES } from "@/lib/career-journey";
import { EDUCATION } from "@/lib/profile";

export function CareerTimeline() {
  return (
    <PageMain>
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
              <div className="career-timeline__heading">
                <h2 className="career-timeline__role">{item.role}</h2>
                <p className="career-timeline__period">{item.period}</p>
              </div>
              <p className="career-timeline__company">{item.company}</p>
              {item.location ? (
                <p className="career-timeline__location">{item.location}</p>
              ) : null}
              <ul className="mt-4 space-y-2">
                {item.highlights.map((line) => (
                  <li key={line} className="list-bullet">
                    <span className="list-bullet__dot" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>

      <section className="panel panel--muted mt-12 p-6 md:mt-16 md:p-8">
        <PanelHeading>Education</PanelHeading>
        <p className="career-timeline__company mt-4">{EDUCATION.school}</p>
        <p className="mt-1 type-body-muted">{EDUCATION.degree}</p>
        <p className="mt-1 type-body-muted">{EDUCATION.years}</p>
        <p className="mt-3 type-body-muted">{EDUCATION.honors}</p>
      </section>
    </PageMain>
  );
}
