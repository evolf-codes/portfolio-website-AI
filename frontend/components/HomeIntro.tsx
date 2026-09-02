import { ProfilePhoto } from "@/components/ProfilePhoto";
import { INTRO_SKILLS, PROFILE_SUMMARY } from "@/lib/profile";
import { SITE_LOCATION, SITE_TAGLINE, SITE_TITLE } from "@/lib/site";

export function HomeIntro() {
  return (
    <section id="about" className="page-hero page-hero--home">
      <div className="page-hero__inner page-hero__inner--home home-intro">
        <div className="home-intro__identity">
          <p className="page-hero__eyebrow">QA Leadership</p>
          <h1 className="home-intro__name">Eric Volfson</h1>
          <p className="home-intro__title">{SITE_TITLE}</p>
          <p className="home-intro__location">{SITE_LOCATION}</p>
          <p className="home-intro__tagline">{SITE_TAGLINE}</p>
        </div>

        <div className="home-intro__profile">
          <ProfilePhoto className="profile-photo--about" priority />
          <div className="home-intro__copy">
            {PROFILE_SUMMARY.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <ul className="home-intro__skills">
          {INTRO_SKILLS.map((skill) => (
            <li key={skill} className="skill-pill">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
