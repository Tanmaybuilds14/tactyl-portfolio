export const metadata = {
  title: "Blog studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }) {
  return <div className="min-h-[70svh] bg-background">{children}</div>;
}
