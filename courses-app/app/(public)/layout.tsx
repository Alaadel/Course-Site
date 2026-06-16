import type { Metadata } from "next";
import "../globals.css";
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
        <html
            lang="en"
            className={`h-full antialiased`}>
            {/* using h-full to keep the footer at the bottom */}
            <body className="h-full flex flex-col">
                <NavHeader />
                {children}
            </body>
        </html>
    );
}
