export const whyCards = [
  {
    index: "01",
    title: "One mentor, one student",
    body: "Every session is 1:1. No cohort calls where your kid watches someone else build.",
  },
  {
    index: "02",
    title: "A product, not a certificate",
    body: "The exit gate is a deployed app with real users — not a completed syllabus.",
  },
  {
    index: "03",
    title: "Small scope, finished work",
    body: "We cut features until the remaining ones can be built and tested properly.",
  },
  {
    index: "04",
    title: "Parents see the work",
    body: "A weekly build log and a demo every Friday, so progress is visible between payments.",
  },
  {
    index: "05",
    title: "No-code first",
    body: "Students ship before they learn syntax. Code comes when the product needs it.",
  },
  {
    index: "06",
    title: "Honest feedback",
    body: "Mentors say when an idea is weak. Praise that is not earned teaches nothing.",
  },
  {
    index: "07",
    title: "Launch week is real",
    body: "Users, feedback and a public demo — the part most courses quietly skip.",
  },
];

export const pricingPlan = {
  name: "The 8-week programme",
  price: "₹16,000",
  priceWas: "₹25,000",
  cadence: "one-time, per student",
  summary:
    "Sixteen live 1:1 sessions, two build reviews a week, and a launched product at the end. Payment plans are available on request.",
  includes: [
    "16 live 1:1 mentor sessions (60 minutes)",
    "Two build clinics a week for 8 weeks",
    "Workbook, templates and Figma starter kit",
    "Weekly parent update and build log",
    "Demo day with family and mentors",
    "One month of post-launch support",
  ],
  excludes: [
    "Third-party tool subscriptions (usually free tiers)",
    "Hardware or paid ad spend",
  ],
  refund:
    "Full refund if you withdraw before session three. After that, unused sessions are refunded pro rata.",
};

export const faqs = [
  {
    q: "Does my child need to know how to code?",
    a: "No. The programme starts with no-code tools and adds code only when the product needs it. Curiosity and a willingness to try things that break matter far more than prior experience.",
  },
  {
    q: "What exactly does my child have at the end?",
    a: "A deployed web app they built, a short case study, a two-minute demo, and a launch checklist. If a project cannot be launched in eight weeks, we cut scope rather than extend the timeline.",
  },
  {
    q: "How much time does this take each week?",
    a: "Plan for 5–7 hours a week: two live sessions plus build time. Weeks 5 and 6 usually take the most effort because the app is going live.",
  },
  {
    q: "Who are the mentors?",
    a: "Practising builders who ship software, not full-time tutors. Each mentor is matched to the student's project area where possible.",
  },
  {
    q: "What if my child's idea is too ambitious?",
    a: "That is normal. Week 1 exists to shrink the idea to something a single student can ship. We usually remove two thirds of the feature list.",
  },
  {
    q: "Is there a guarantee?",
    a: "We do not guarantee university admissions or investment. We do commit to a launched product if the student attends sessions and completes the work — and we will tell you early if that is at risk.",
  },
  {
    q: "How are sessions scheduled?",
    a: "Sessions run Mon–Sat, 10:00–19:00 IST. We agree a fixed weekly slot before the programme starts and keep it for all eight weeks.",
  },
  {
    q: "What happens if we miss a session?",
    a: "One reschedule per phase with 24 hours' notice. Sessions cancelled with less notice are not carried forward.",
  },
];

/**
 * Testimonials. The live site uses randomuser.me portraits — replace these with
 * real parent/student quotes and photographs (with written consent) before launch.
 */
export const testimonials = [
  {
    quote:
      "The weekly build log was the part I did not expect to value. I could see what my daughter actually did, not just what she said she did.",
    name: "Parent of a Cohort 04 student",
    role: "Parent",
    initials: "P4",
  },
  {
    quote:
      "I came in wanting to build a game. I left with an app eleven farmers used. The scope cut in week one was the best thing that happened.",
    name: "Student, KrishiDrishti",
    role: "Student",
    initials: "KD",
  },
  {
    quote:
      "Mentors told me when my idea was boring. That sounds harsh, but it saved me six weeks of building something nobody wanted.",
    name: "Student, Converza",
    role: "Student",
    initials: "CV",
  },
  {
    quote:
      "Demo day was the first time he spoke about his own work without being prompted. That was worth more than the certificate from his last course.",
    name: "Parent of a Cohort 03 student",
    role: "Parent",
    initials: "P3",
  },
  {
    quote:
      "Two sessions a week is a real commitment. We planned around it and it worked — but it is not a background activity.",
    name: "Parent of a Cohort 02 student",
    role: "Parent",
    initials: "P2",
  },
  {
    quote:
      "The best part was launching and getting feedback from strangers. It made everything before it feel like preparation for something real.",
    name: "Student, Paws of Promise",
    role: "Student",
    initials: "PP",
  },
];

export const aboutValues = [
  {
    title: "Ship something small",
    body: "A finished small thing teaches more than an unfinished large one. Every project is scoped to what one student can launch in eight weeks.",
  },
  {
    title: "Evidence over promises",
    body: "We publish what students made and what happened when they launched it. No admissions guarantees, no invented numbers.",
  },
  {
    title: "Teach the judgement",
    body: "Tools change every year. Knowing which problem is worth solving, and when to cut, does not.",
  },
];

export const timeline = [
  { year: "2023", event: "Tactyqal Labs starts as a weekend build club for six students." },
  { year: "2024", event: "The 8-week structure is formalised; first cohort launches products publicly." },
  { year: "2025", event: "Six flagship student products ship; the free assessment suite goes live." },
  { year: "2026", event: "The programme, tools and blog are rebuilt as one platform." },
];
