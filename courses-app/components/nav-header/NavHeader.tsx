'use client';

import { AuthContext } from "@/store/AuthContext";
import styles from "./NavHeader.module.css";
import { useContext } from "react";
import NavigationHeaderButton from "./NavHeaderButton";

export default function NavHeader() {
    const context = useContext(AuthContext);

    return (
        <header><nav>
            <ul className={styles.NavHeader}>
                {/* show login only if not logged in */}
                {!context?.isSignedIn && (<li><NavigationHeaderButton href="/login">Login</NavigationHeaderButton></li>)}

                <li><NavigationHeaderButton href="/products">Products</NavigationHeaderButton></li>

                {context?.isSignedIn && (<li><NavigationHeaderButton href="/courses">Courses</NavigationHeaderButton></li>)}
                {context?.isSignedIn && (<li><NavigationHeaderButton href="/orders">Orders</NavigationHeaderButton></li>)}
                {context?.isSignedIn && (<li><NavigationHeaderButton href="/account">Account</NavigationHeaderButton></li>)}

                {!context?.isSignedIn && (<li><NavigationHeaderButton href="/signup">Sign Up</NavigationHeaderButton></li>)}

                {/* <Link href="/admin">Go to Admin Page</Link> */}
            </ul>
        </nav></header>
    )
}