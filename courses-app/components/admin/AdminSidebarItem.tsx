import Link from "next/link";

export default function AdminSidebarItem({ href, label }: { href: string; label: string }) {
    return (
        <li>
            <Link href={href} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                {label}
            </Link>
        </li>
    );
}