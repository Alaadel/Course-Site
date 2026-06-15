import type { Metadata } from "next";
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
        {/* using h-full to keep the footer at the bottom */}
        <body className="h-full flex flex-col">
          <NavHeader />
          {children}
          <div id="modal"></div>  {/* this is where the modal will be injected, it is placed here to be a sibling of the main content, so that it can overlay it. */}
          <footer className="mt-auto text-center">By Alaadel, 2026</footer>
        </body>
      </html>
    </AuthContextProvider>
  );
}
