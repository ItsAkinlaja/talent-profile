import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/components/ReduxProvider";

const LOGO     = "https://ik.imagekit.io/scmchurch/Talent%20Profile%20Monogram%20Logo.png";
const OG_IMAGE = "https://ik.imagekit.io/scmchurch/WhatsApp%20Image%202026-10-06%20at%2020.03.17.jpeg";
const SITE_URL = "https://talentprofile.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "TalentProfile — Capture. Manage. Showcase.",
    template: "%s | TalentProfile",
  },
  description:
    "A professional platform to create, manage and showcase talent profiles with ease. Export to PDF and DOCX.",
  keywords: ["talent", "profile", "HR", "resume", "portfolio", "management"],
  authors: [{ name: "TalentProfile" }],
  creator: "TalentProfile",
  metadataBase: new URL(SITE_URL),

  /* ── Favicon / icons ── */
  icons: {
    icon: [
      { url: LOGO, type: "image/png" },
    ],
    apple: [
      { url: LOGO, sizes: "180x180", type: "image/png" },
    ],
    shortcut: LOGO,
  },

  /* ── Open Graph (Facebook, LinkedIn, WhatsApp, Slack…) ── */
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "TalentProfile",
    title: "TalentProfile — Capture. Manage. Showcase.",
    description:
      "A professional platform to create, manage and showcase talent profiles with ease.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "TalentProfile — Capture. Manage. Showcase.",
      },
    ],
    locale: "en_US",
  },

  /* ── Twitter / X card ── */
  twitter: {
    card: "summary_large_image",
    site: "@talentprofile",
    creator: "@talentprofile",
    title: "TalentProfile — Capture. Manage. Showcase.",
    description:
      "A professional platform to create, manage and showcase talent profiles with ease.",
    images: [OG_IMAGE],
  },

  /* ── PWA / mobile web app ── */
  applicationName: "TalentProfile",
  appleWebApp: {
    capable: true,
    title: "TalentProfile",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Extra favicon sizes as <link> for maximum browser compatibility */}
        <link rel="icon" type="image/png" href={LOGO} />
        <link rel="apple-touch-icon" href={LOGO} />
        <link rel="shortcut icon" href={LOGO} />

        {/* Theme colour — brand blue */}
        <meta name="theme-color" content="#1A3FD0" />
        <meta name="msapplication-TileColor" content="#1A3FD0" />
        <meta name="msapplication-TileImage" content={LOGO} />
      </head>
      <body className="bg-surface-secondary antialiased">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
