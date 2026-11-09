/**
 * Site-wide constants. Contact details are environment-overridable because the
 * live site's phone/email/link could not be read during the audit — confirm
 * them before launch and keep them here only.
 */
export const site = {
  name: "Tactyqal Labs",
  wordmark: "TACTYQAL",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tactyqal.com",
  tagline:
    "Empower your kid to build the next app that impacts millions — in 8 weeks.",
  description:
    "An 8-week, 1:1 no-code mentoring programme where teenagers research, design, build and launch a real product — with a working app at the end.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@tactyqal.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+91 90000 00000",
  hours: "Mon–Sat, 10:00–19:00 IST",
  bookingUrl: "/contact",
  price: "₹16,000",
  priceWas: "₹25,000",
};

export const navigation = [
  { title: "Programme", href: "/program" },
  { title: "Success stories", href: "/success-stories" },
  { title: "Free tools", href: "/tools" },
  { title: "Pricing", href: "/pricing" },
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
];

export const legalLinks = [
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
  { title: "Refund policy", href: "/refund-policy" },
];
