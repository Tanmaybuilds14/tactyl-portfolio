import { LegalPage } from "@/components/sections/legal-page";

export const metadata = {
  title: "Refund policy",
  description: "When the 8-week programme is refundable, and how to request one.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return <LegalPage slug="refund-policy" />;
}
