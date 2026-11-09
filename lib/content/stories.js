/**
 * Student projects.
 *
 * Content note: names, ages and copy here are placeholders carried over from the
 * live page's six project titles. Replace with real, consented case studies
 * (screenshots + parent-approved attribution) before launch — the current site
 * uses stock testimonial photos, which is the trust problem this redesign fixes.
 */
export const stories = [
  {
    slug: "krishidrishti",
    name: "KrishiDrishti",
    category: "Civic tech",
    cohort: "Cohort 04",
    year: "2025",
    tagline: "Helping small farmers spot crop disease from a phone photo.",
    problem:
      "A student watched her uncle lose a season's margin to a disease he recognised three weeks too late. Local advice arrived after the damage.",
    build: [
      "A camera-first flow: one photo, one answer, no sign-up wall",
      "An image classifier trained on labelled leaf photos",
      "A simple Hindi-first advisory screen with next steps",
    ],
    result:
      "Tested with eleven farmers in two villages. The clearest feedback was not about accuracy — it was that the advice needed to fit a phone held in one hand in a field.",
    stack: ["No-code app", "Image classification", "Hindi UI"],
    metric: "11",
    metricLabel: "farmers tested",
    accent: "from-stone-500/30",
  },
  {
    slug: "elenor",
    name: "Elenor",
    category: "Commerce",
    cohort: "Cohort 03",
    year: "2025",
    tagline: "A vegan handbag storefront built around one honest product page.",
    problem:
      "Plant-based leather is hard to judge online. Buyers ask the same five questions about durability before every purchase.",
    build: [
      "A single-product storefront with a materials deep-dive",
      "A pre-order flow with a transparent delivery estimate",
      "Photo-led reviews instead of star ratings alone",
    ],
    result:
      "The product page answers the durability question with a 40-second video, which became the most-watched element on the site.",
    stack: ["Storefront", "Photo reviews", "Pre-orders"],
    metric: "40s",
    metricLabel: "materials video",
    accent: "from-neutral-500/30",
  },
  {
    slug: "one-last-chapter",
    name: "One Last Chapter",
    category: "Community",
    cohort: "Cohort 04",
    year: "2025",
    tagline: "A secondhand bookshop that makes finishing a book a shared event.",
    problem:
      "Secondhand books are cheap but lonely. Readers finish a book and have nobody to talk to about it.",
    build: [
      "A shelf-building flow for used books with condition notes",
      "A monthly read-along with a shared discussion thread",
      "A donation path for school libraries",
    ],
    result:
      "The first read-along filled in four days, and the shop ran out of its first batch of donated titles before the launch week ended.",
    stack: ["Marketplace", "Community", "Donations"],
    metric: "4 days",
    metricLabel: "to fill read-along",
    accent: "from-zinc-500/30",
  },
  {
    slug: "paws-of-promise",
    name: "Paws of Promise",
    category: "Social impact",
    cohort: "Cohort 02",
    year: "2024",
    tagline: "Rehoming pets with a handover checklist instead of a comment thread.",
    problem:
      "Rescues were coordinating adoptions in WhatsApp groups. Medical history and follow-ups were getting lost between chats.",
    build: [
      "A pet profile with vaccination and medical history",
      "An adopter questionnaire and screening checklist",
      "A 30-day follow-up reminder for the rescue team",
    ],
    result:
      "The checklist turned a chat-based process into something a volunteer could pick up on their first day.",
    stack: ["Directory", "Forms", "Reminders"],
    metric: "30-day",
    metricLabel: "follow-up loop",
    accent: "from-stone-400/30",
  },
  {
    slug: "audionova",
    name: "AudioNova",
    category: "Education",
    cohort: "Cohort 03",
    year: "2025",
    tagline: "Turning dense study notes into audio lessons you can walk with.",
    problem:
      "A student with dyslexia could understand chapters when they were read aloud, but reading them took three times as long.",
    build: [
      "A paste-your-notes flow that produces short audio segments",
      "Chapter markers and a one-tap replay of the last minute",
      "A shared library for classmates",
    ],
    result:
      "The strongest use case was not revision before an exam — it was the first read of a new chapter, on the walk home.",
    stack: ["Audio", "Text to speech", "Shared library"],
    metric: "3×",
    metricLabel: "faster first read",
    accent: "from-neutral-400/30",
  },
  {
    slug: "converza",
    name: "Converza",
    category: "AI tooling",
    cohort: "Cohort 05",
    year: "2026",
    tagline: "A conversation partner for language learners who freeze up out loud.",
    problem:
      "Learners can pass a vocabulary test and still panic in a real conversation. Apps test recall, not nerve.",
    build: [
      "Scenario-based voice practice with gentle corrections",
      "A confidence score based on speaking time, not accuracy",
      "A weekly streak that rewards attempts over perfection",
    ],
    result:
      "Measuring speaking time rather than mistakes changed behaviour: students started choosing harder scenarios on purpose.",
    stack: ["Voice", "AI feedback", "Progress loops"],
    metric: "5",
    metricLabel: "practice scenarios",
    accent: "from-zinc-400/30",
  },
];

export function getStory(slug) {
  return stories.find((story) => story.slug === slug);
}

export const stats = [
  { value: 100, suffix: "+", label: "Students mentored" },
  { value: 6, suffix: "", label: "Flagship products shipped" },
  { value: 8, suffix: " wks", label: "From idea to launch" },
  { value: 1, suffix: ":1", label: "Mentor per student" },
];
