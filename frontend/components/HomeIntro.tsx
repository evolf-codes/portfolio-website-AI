import { ProfilePhoto } from "@/components/ProfilePhoto";
import { CORE_SKILLS, PROFILE_SUMMARY } from "@/lib/profile";
import { SITE_LOCATION, SITE_TAGLINE, SITE_TITLE } from "@/lib/site";

const ABOUT_COPY = [PROFILE_SUMMARY[0], PROFILE_SUMMARY[2], PROFILE_SUMMARY[3]] as const;

export function HomeIntro() {
  return (
    <section id="about" className="page-hero page-hero--home">
      <div className="page-hero__inner page-hero__inner--home home-intro">
        <div className="home-intro__identity">
          <p className="page-hero__eyebrow">QA Leadership</p>
          <h1 className="home-intro__name mt-4 max-w-4xl">Eric Volfson</h1>
          <p className="home-intro__title mt-4 text-lg font-medium md:text-xl">{SITE_TITLE}</p>
          <p className="home-intro__location mt-3 text-sm font-medium tracking-wide text-[var(--slate)] md:text-base">
            {SITE_LOCATION}
          </p>
          <p className="home-intro__tagline mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
            {SITE_TAGLINE}
          </p>
        </div>

        <div className="home-intro__profile">
          <ProfilePhoto className="profile-photo--about" />
          <div className="space-y-4">
            {ABOUT_COPY.map((item) => (
              <p key={item} className="type-body">
                {item}
              </p>
            ))}
          </div>
        </div>

        <ul className="home-intro__skills flex flex-wrap gap-2">
          {CORE_SKILLS.slice(0, 8).map((skill) => (
            <li key={skill} className="skill-pill">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
