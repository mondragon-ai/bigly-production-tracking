import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {NavMenu} from "@/components/layout.tsx/NavMenu";
import styles from "./page.module.css";
import {TopBar} from "@/components/shared/TopBar";
import {Footer} from "@/components/layout.tsx/Footer";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bigly Production Tracking",
  description: "Help track produciton from print to ship",
};

export default function OtherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${styles.mainPage}`}
    >
      <NavMenu />
      <main className={styles.mainSection}>
        <TopBar />
        {children}
        <Footer />
      </main>
    </div>
  );
}
