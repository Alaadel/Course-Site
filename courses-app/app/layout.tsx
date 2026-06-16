import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "@/store/AuthContext";

export const metadata: Metadata = {
  title: "Public Layout - Course Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Need to define the auth context here so both admin and public has access to
    <AuthContextProvider>
      <html
        lang="en"
        className={`h-full antialiased`}>
        {/* using h-full to keep the footer at the bottom */}
        <body className="h-full flex flex-col">
          {children}
          <div id="modal"></div>  {/* this is where the modal will be injected, it is placed here to be a sibling of the main content, so that it can overlay it. */}
          <footer className="mt-auto text-center">By Alaadel, 2026</footer>
        </body>
      </html>
    </AuthContextProvider>
  );
}
