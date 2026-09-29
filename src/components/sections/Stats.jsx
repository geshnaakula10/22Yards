import { facilityStats } from "../../content/facilities";
import SectionHeading from "../ui/SectionHeading";

/** Adds the count-up to the scene's enter timeline (scrubbed by scroll, so it reverses too). */
export function statsEnter(tl, content) {
  tl.add(
    {
      targets: content.querySelectorAll("[data-count]"),
      innerHTML: [0, (el) => el.dataset.count],
      round: 1,
      duration: 900,
      easing: "easeOutExpo",
      delay: (_, i) => i * 80,
    },
    150
  );
}

export default function Stats() {
  return (
    <div className="container">
      <div data-reveal>
        <SectionHeading id="facilities-title" index="04" label="Facilities" title="The facility at a glance" />
      </div>
      <dl className="stat-grid">
        {facilityStats.map((stat) => (
          <div className="stat" key={stat.label} data-reveal>
            <dt className="stat__label">{stat.label}</dt>
            <dd className="stat__value">
              <span data-count={stat.value}>{stat.value}</span>
              <span className="stat__suffix" aria-hidden="true">
                {stat.suffix}
              </span>
              <span className="visually-hidden">or more</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
