// components/StyledLink.tsx
import Link from "next/link";

export default function StyledLink({ href, children, ...props }: { href: string, children: React.ReactNode, [key: string]: any }) {
    return (
        <Link href={href} {...props} className="text-blue-600 hover:text-blue-800 underline">
            {children}
        </Link>
    );
}