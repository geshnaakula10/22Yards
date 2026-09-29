export const programsIntro = {
  title: "Our programs",
  subtitle: "Elevate your game: junior and senior training programs",
  intro:
    "Discover tailored cricket training at 22Yards Houston with our distinct Junior and Senior Programs. From foundational skills for our young enthusiasts to advanced tactics for seasoned players, our programs are designed to help every cricketer achieve their full potential.",
};

export const programs = [
  {
    id: "junior",
    name: "Junior Development Program",
    alias: "Young Cricketers Initiative",
    ages: { display: "6–16", label: "Ages 6–16" },
    description:
      "Designed for players aged 6–16. The program instils the fundamentals of cricket through a structured curriculum that emphasizes skill development, understanding of the game, and physical fitness—fostering a love for the game and a strong foundation for future growth.",
  },
  {
    id: "senior",
    name: "Senior Training Program",
    alias: "Elite Cricketers Pathway",
    ages: { display: "17+", label: "Ages 17+" },
    description:
      "High-performance training for players aged 17 and above, preparing athletes for competitive and professional levels of cricket. It combines advanced coaching, mental conditioning, and exposure to higher levels of play.",
  },
];

/** "Levels" from the coaching FAQ. */
export const levels = ["Beginner", "Intermediate", "Advanced", "1-on-1 personal coaching"];

/** High-Performance Center program, from the live Coaching page. */
export const hpc = {
  name: "High-Performance Center (HPC) program",
  tagline: "Train smarter. Play harder. Achieve more.",
  features: [
    {
      title: "Quarterly skill assessments",
      text: "In-depth video analysis and a personalized performance report every quarter, reviewed by our Head Coach, Harmeet.",
    },
    {
      title: "Customized fitness plans",
      text: "Professional fitness assessments and personalized training programs designed to enhance athletic performance.",
    },
    {
      title: "Elite skill-based coaching",
      text: "Advanced coaching focused on technical mastery and tactical excellence.",
    },
    {
      title: "Specialized batting training",
      text: "Develop power-hitting and range-hitting technique at high intensity with side-arm specialists and bowling machines.",
    },
    {
      title: "Bowling excellence program",
      text: "Refine your technique with customized drills, improve your run-up and sharpen your execution.",
    },
    {
      title: "Dynamic fielding sessions",
      text: "Dedicated fielding practice every Friday — outdoors when possible, indoors when necessary.",
    },
  ],
};

export const coaches = {
  title: "Meet our coaches",
  intro:
    "Our coaches bring years of professional experience and a passion for mentoring young players.",
  people: [
    { id: "harmeet", name: "Harmeet Singh", role: "Head Coach", photo: "coachHarmeet" },
    { id: "kamal", name: "Kamal Passi", role: "Coach", photo: "coachKamal" },
  ],
};
