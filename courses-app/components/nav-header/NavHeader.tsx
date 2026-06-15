'use client';

import { AuthContext } from "@/store/AuthContext";
import styles from "./NavHeader.module.css";
import { useContext } from "react";
import NavigationHeaderButton from "./NavHeaderButton";
import { useRouter } from "next/navigation";

export default function NavHeader() {
    const context = useContext(AuthContext);
    const router = useRouter();

    return (
        <header><nav>
            <ul className={styles.NavHeader}>
                {/* show login only if not logged in */}

                <NavigationHeaderButton href="/">Home</NavigationHeaderButton>
                <NavigationHeaderButton href="/products">Products</NavigationHeaderButton>

                {context?.isLoggedIn && (<NavigationHeaderButton href="/courses">Courses</NavigationHeaderButton>)}
                {context?.isLoggedIn && (<NavigationHeaderButton href="/orders">Orders</NavigationHeaderButton>)}
                {context?.isLoggedIn && (<NavigationHeaderButton href="/account">Account</NavigationHeaderButton>)}

                {!context?.isLoggedIn && (<NavigationHeaderButton href="/login">Login</NavigationHeaderButton>)}
                {!context?.isLoggedIn && (<NavigationHeaderButton href="/register">Register</NavigationHeaderButton>)}

                {/* <Link href="/admin">Go to Admin Page</Link> */}
            </ul>
        </nav></header>
    )
}