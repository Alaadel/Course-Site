import AdminSidebarItem from "./AdminSidebarItem";

export default function AdminSidebar({ items }: { items: { href: string; label: string }[] }) {
    return (
        <aside className="w-64 bg-gray-200 p-4">
            <ul>
                {items.map((item) => (
                    <AdminSidebarItem key={item.href} href={item.href} label={item.label} />
                ))}
            </ul>
        </aside>
    );
}