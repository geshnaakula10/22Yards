import { hpc, levels, programs, programsIntro } from "../../content/programs";
import { cta } from "../../content/site";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";

export default function Programs() {
  return (
    <div className="container">
      <div className="heading-row">
        <SectionHeading id="coaching-title" index="07" label={`Coaching · ${programsIntro.title}`} title={programsIntro.subtitle} size="md" />
        <p className="body-text heading-row__aside" data-reveal>
          {programsIntro.intro}
        </p>
      </div>

      <ol className="program-cards" role="list">
        {programs.map((p) => (
          <li className={`program-card program-card--${p.id}`} key={p.id} data-reveal data-spotlight>
            <p className="program-card__ages">
              <span className="mono">Ages</span>
              <span className="program-card__num">{p.ages.display}</span>
            </p>
            <h3 className="program-card__name">{p.name}</h3>
            <p className="program-card__alias mono">{p.alias}</p>
            <p className="body-text">{p.description}</p>
          </li>
        ))}
      </ol>

      <section className="hpc" aria-labelledby="hpc-title" data-reveal>
        <div className="hpc__head" data-reveal>
          <p className="mono hpc__kicker">High-Performance Center</p>
          <h3 className="hpc__title" id="hpc-title">
            {hpc.name}
          </h3>
          <p className="hpc__tagline">{hpc.tagline}</p>
        </div>
        <ol className="hpc__list" role="list">
          {hpc.features.map((f, i) => (
            <li className="hpc__item" key={f.title} data-reveal>
              <span className="hpc__num mono" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="hpc__item-title">{f.title}</h4>
              <p className="hpc__item-text">{f.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="levels" data-reveal>
        <p className="mono levels__label">Levels</p>
        <ul className="levels__list" role="list">
          {levels.map((l) => (
            <li key={l} className="chip chip--outline">
              {l}
            </li>
          ))}
        </ul>
        <p className="levels__note">Standard programs run as estimated 12-week courses, with shorter clinics and extended options.</p>
      </div>

      <div className="actions" data-reveal>
        <CTAButton href={cta.coaching.href}>{cta.coaching.label}</CTAButton>
        <CTAButton href="#coaches" variant="outline">
          Meet the coaches
        </CTAButton>
      </div>
    </div>
  );
}
