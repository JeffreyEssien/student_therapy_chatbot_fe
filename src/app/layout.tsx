import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chatmate — A softer place to think, and to be heard.",
  description:
    "A 24/7 AI therapy companion for students. Anonymous, gentle, always within reach.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Chatmate — A softer place to think, and to be heard.",
    description:
      "A 24/7 AI therapy companion for students. Anonymous, gentle, always within reach.",
    images: [
      {
        url: "/logo.png",
        width: 1917,
        height: 923,
        alt: "Chatmate",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatmate",
    description:
      "A 24/7 AI therapy companion for students. Anonymous, gentle, always within reach.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
