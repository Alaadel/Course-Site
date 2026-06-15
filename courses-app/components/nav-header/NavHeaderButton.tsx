'use client';

import Link from "next/link";
import styles from "./NavHeaderButton.module.css";
import { usePathname } from "next/navigation";

export default function NavigationHeaderButton({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const isSame = pathname === href;

    return (
        isSame ? (
            <li>
                <span className={styles.NavHeaderButton + " " + styles.active}>{children}</span>
            </li>
        ) : (
            <li>
                <Link className={styles.NavHeaderButton} href={href}>
                    {children}
                </Link>
            </li>
        )
    );
}