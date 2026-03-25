import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hoang Van Trong Portfolio",
  description: "Portfolio của Hoàng Văn Trọng — Intern Developer",
  icons: { icon: "/assets/rocket-icon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=TikTok+Sans:opsz,slnt,wdth,wght@12..36,-6..0,75..150,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
