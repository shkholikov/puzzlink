import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/navbar";
import Footer from "@/ui/footer";

const font = Montserrat({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PuzzLink",
  description: "PuzzLink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${font.className} bg-slate-900 flex h-full bg-fixed bg-gradient-to-b from-violet-600/[.15] via-transparent`}
      >
        <div className="max-w-[50rem] flex flex-col mx-auto w-full h-full">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
