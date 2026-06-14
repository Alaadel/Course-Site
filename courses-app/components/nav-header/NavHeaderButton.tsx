import Link from "next/link";
import styles from "./NavHeaderButton.module.css";

export default function NavigationHeaderButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
            <Link className={styles.NavHeaderButton} href={href}>
                {children}
            </Link>
    );
}