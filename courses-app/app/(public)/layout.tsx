import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AuthContextProvider } from "@/store/AuthContext";
import NavHeader from "@/components/nav-header/NavHeader";

export const metadata: Metadata = {
  title: "Public Layout - Course Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <html
        lang="en"
        className={`h-full antialiased`}>
        <body className="min-h-full flex flex-col">
          <NavHeader />
          {children}
          <footer className="mt-auto text-center">By Alaadel, 2026</footer>
        </body>
      </html>
    </AuthContextProvider>
  );
}
