import type { Metadata } from "next";
import { Open_Sans, Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReduxWrapper from "@/Redux/ReduxWrapper";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
          className={`
            ${openSans.className} 
            ${montserrat.variable} 
            antialiased
          `}
        >
          <div>{children}</div>
          <Toaster reverseOrder={false} />
        </body>
      </html>
    </ReduxWrapper>
  );
}
