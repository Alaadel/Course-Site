import type { Metadata } from "next";
import "@/app/globals.css";
import { AccountPageContextProvider } from "@/store/AccountPageContext";

export const metadata: Metadata = {
  title: "Account Layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AccountPageContextProvider>
      <html
        lang="en"
        className={`h-full antialiased`}>
        <body className="min-h-full flex flex-col">
          {children}
        </body>
      </html>
    </AccountPageContextProvider>
  );
}
