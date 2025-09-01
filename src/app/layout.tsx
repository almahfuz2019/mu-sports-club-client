import type { Metadata } from "next";
import { Open_Sans, Yanone_Kaffeesatz } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReduxWrapper from "@/Redux/ReduxWrapper";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const yanoneKaffeesatz = Yanone_Kaffeesatz({
  variable: "--font-yanone-kaffeesatz",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ca Immigration",
  description:
    "Ca Immigration is a platform that helps you to immigrate to Canada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxWrapper>
      <html lang="en">
        <body
          className={`${openSans.className} ${yanoneKaffeesatz.variable} antialiased`}
        >
          <div>{children}</div>
          <Toaster reverseOrder={false} />
        </body>
      </html>
    </ReduxWrapper>
  );
}
