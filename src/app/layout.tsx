import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import styles from "./page.module.css";
import {Toaster} from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bigly Production Tracking",
  description: "Help track produciton from print to ship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${styles.mainPage}`}
      >
        <main>
          <Toaster position="bottom-center" />
          {children}
        </main>
      </body>
    </html>
  );
}
