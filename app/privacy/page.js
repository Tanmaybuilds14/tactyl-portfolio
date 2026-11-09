import { LegalPage } from "@/components/sections/legal-page";

export const metadata = {
  title: "Privacy note",
  description: "What Tactyqal Labs collects, why, and how to have it removed.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage slug="privacy" />;
}
