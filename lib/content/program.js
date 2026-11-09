export const programPhases = [
  {
    id: "research",
    label: "Phase 01",
    weeks: "Weeks 1–2",
    title: "Find a problem worth solving",
    summary:
      "We start with a person, not an idea. Each student picks a real problem they have watched someone struggle with, then interviews five people to check it is worth building.",
    outcomes: [
      "A one-page problem statement and target user",
      "Five short customer interviews, written up",
      "A scope small enough to ship in six weeks",
    ],
    session:
      "You leave week 2 with a problem you can explain in one sentence — and evidence that someone other than you cares about it.",
  },
  {
    id: "design",
    label: "Phase 02",
    weeks: "Weeks 3–4",
    title: "Design the flow before the pixels",
    summary:
      "Students sketch the core flow on paper, then rebuild it in Figma. The rule is simple: one user, one job, one screen at a time.",
    outcomes: [
      "A clickable Figma prototype of the main flow",
      "A four-step design system: type, colour, spacing, components",
      "A feedback round with a parent or mentor tester",
    ],
    session:
      "The first prototype is usually wrong. That is the point — fixing it in Figma takes minutes, fixing it in code takes days.",
  },
  {
    id: "build",
    label: "Phase 03",
    weeks: "Weeks 5–6",
    title: "Build a working version, not a mock-up",
    summary:
      "No-code tools plus AI assistance get students to a real, usable product: real data, real accounts, real edge cases. Mentors review the build twice a week.",
    outcomes: [
      "A deployed app with working core features",
      "A short build log of decisions and trade-offs",
      "Basic analytics so launch week has data",
    ],
    session:
      "By the end of week 6 the app is live on the internet. It may be rough, but it is real and it is theirs.",
  },
  {
    id: "launch",
    label: "Phase 04",
    weeks: "Weeks 7–8",
    title: "Launch, listen, present",
    summary:
      "Students put the product in front of real users, fix the three most painful issues, then present the whole journey to family, mentors and peers.",
    outcomes: [
      "Ten real users and a first feedback loop",
      "A two-minute demo and a one-page case study",
      "A launch checklist they can repeat next time",
    ],
    session:
      "Demo day is not a graduation. It is the first time the student has to explain their work to someone who did not watch them build it.",
  },
];

export const sampleWeek = [
  {
    day: "Monday",
    title: "1:1 working session",
    duration: "60 min",
    detail:
      "Screen-share with the mentor. Review last week's build, set this week's single most important outcome.",
  },
  {
    day: "Wednesday",
    title: "Build clinic",
    duration: "45 min",
    detail:
      "Bring one blocker. We debug it together rather than handing over a finished answer.",
  },
  {
    day: "Friday",
    title: "Demo and feedback",
    duration: "30 min",
    detail:
      "Show what changed. Two things to keep, one thing to fix next week.",
  },
  {
    day: "Async",
    title: "Chat support",
    duration: "Weekdays",
    detail:
      "Questions between sessions go in the shared channel; mentors reply within one working day.",
  },
];

export const whoItsFor = [
  "Ages 13–18 who can commit 5–7 hours a week",
  "Curious beginners — no coding experience needed",
  "Students who would rather ship a small product than finish a long course",
  "Parents who want to see evidence of progress, not just attendance",
];

export const notFor = [
  "Students looking for a certificate with no build time",
  "Anyone who cannot attend the weekly live sessions",
  "Projects that need hardware, payments or a team of adults",
];
