import { LegalPage } from "@/components/sections/legal-page";

export const metadata = {
  title: "Terms of service",
  description: "Terms for the 8-week programme and the free tools on tactyqal.com.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage slug="terms" />;
}
