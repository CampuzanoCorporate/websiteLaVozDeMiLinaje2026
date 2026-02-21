import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600'],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "La Voz de mi Linaje - María R. García",
  description: "Sanación transgeneracional y constelaciones familiares",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${cormorant.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
