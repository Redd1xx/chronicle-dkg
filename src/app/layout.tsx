import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#05070a",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Chronicle DKG | Verifiable Knowledge-Grounded Media Studio",
  description: "Grounding Livepeer AI video generation in OriginTrail Decentralized Knowledge Graphs with verifiable C2PA provenance UALs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Geist:wght@100..900&family=JetBrains+Mono:wght@100..800&family=Syne:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#05070a] text-zinc-100 antialiased min-h-screen selection:bg-[#fbbf24]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
