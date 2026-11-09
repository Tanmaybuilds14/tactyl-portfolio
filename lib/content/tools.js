/**
 * The eight free assessments from the live site. Each has its own page so it can
 * rank and be shared. Scoring logic lives with the original tools — these pages
 * explain the assessment and collect an email for the result, which is the
 * contract the plan specifies ("optional email for the result").
 */
export const tools = [
  {
    slug: "startup-idea-generator",
    name: "Startup Idea Generator",
    category: "Ideation",
    minutes: 5,
    blurb:
      "Answer six questions about problems you have personally watched someone struggle with, and get three buildable ideas back.",
    whatYouGet: [
      "Three ideas sized for an 8-week build",
      "The user and the moment of pain for each",
      "A first interview question to test each one",
    ],
    goodFor: "Students who say “I don't know what to build.”",
  },
  {
    slug: "fundability-assessment",
    name: "Fundability Assessment",
    category: "Validation",
    minutes: 8,
    blurb:
      "A blunt read on whether an idea could attract a first cheque, scored on market, wedge and evidence.",
    whatYouGet: [
      "A score across four dimensions",
      "The weakest assumption to test first",
      "Comparable early-stage companies to study",
    ],
    goodFor: "Students thinking about competitions and accelerators.",
  },
  {
    slug: "team-evaluation",
    name: "Team Evaluation",
    category: "Team",
    minutes: 6,
    blurb:
      "Map who does what on a student team, and find the gap that will stall the project in week five.",
    whatYouGet: [
      "A role coverage grid",
      "The single most likely bottleneck",
      "A suggested weekly cadence",
    ],
    goodFor: "Teams of two to four building together.",
  },
  {
    slug: "pitch-deck-analyzer",
    name: "Pitch Deck Analyzer",
    category: "Storytelling",
    minutes: 10,
    blurb:
      "Paste your slide titles and get a structural review: what is missing, what is out of order, what to cut.",
    whatYouGet: [
      "A slide-by-slide structure check",
      "The three questions judges will ask",
      "A tighter one-line pitch",
    ],
    goodFor: "Demo day and competition prep.",
  },
  {
    slug: "top-10-traits",
    name: "Top 10 Traits",
    category: "Self-assessment",
    minutes: 7,
    blurb:
      "A short self-assessment across ten builder traits, from follow-through to asking for help.",
    whatYouGet: [
      "Your two strongest traits",
      "Two habits to practise in the next month",
      "A matching weekly routine",
    ],
    goodFor: "Students deciding whether a self-paced build suits them.",
  },
  {
    slug: "cofounder-compatibility",
    name: "Cofounder Compatibility",
    category: "Team",
    minutes: 8,
    blurb:
      "Two short questionnaires that surface the disagreements worth having before you start building.",
    whatYouGet: [
      "A compatibility read across four axes",
      "The decisions you should write down now",
      "A split-the-work suggestion",
    ],
    goodFor: "Friends starting a project together.",
  },
  {
    slug: "problem-solution-fit",
    name: "Problem-Solution Fit",
    category: "Validation",
    minutes: 6,
    blurb:
      "Check whether the thing you built actually answers the problem you started with.",
    whatYouGet: [
      "A fit score with the reasoning shown",
      "Evidence you still need to collect",
      "One change worth testing this week",
    ],
    goodFor: "Anyone past their first build.",
  },
  {
    slug: "landing-page-assessment",
    name: "Landing Page Assessment",
    category: "Growth",
    minutes: 9,
    blurb:
      "A page-level review of clarity, proof and next step — measured against what a first-time visitor needs.",
    whatYouGet: [
      "Clarity, proof and action scores",
      "The first fix that usually lifts sign-ups",
      "A rewrite of your headline",
    ],
    goodFor: "Students about to launch.",
  },
];

export function getTool(slug) {
  return tools.find((tool) => tool.slug === slug);
}

export const toolCategories = [...new Set(tools.map((tool) => tool.category))];
