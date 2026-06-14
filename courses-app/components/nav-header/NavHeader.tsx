'use client';

import { AuthContext } from "@/store/AuthContext";
import styles from "./NavHeader.module.css";
import { useContext } from "react";
import NavigationHeaderButton from "./NavHeaderButton";

export default function NavHeader() {
    const context = useContext(AuthContext);

    return (
        <>
            <ul className={styles.NavHeader}>
                {/* show login only if not logged in */}
                {!context?.isSignedIn && (
                    <>
                        <NavigationHeaderButton href="/login">Login</NavigationHeaderButton>
                    </>
                )}

                <NavigationHeaderButton href="/products">Products</NavigationHeaderButton>

                {context?.isSignedIn ? (
                    <>
                        <NavigationHeaderButton href="/courses">Courses</NavigationHeaderButton>
                        <NavigationHeaderButton href="/orders">Orders</NavigationHeaderButton>
                        <NavigationHeaderButton href="/account">Account</NavigationHeaderButton>
                    </>
                ) : (
                    <NavigationHeaderButton href="/signup">Sign Up</NavigationHeaderButton>
                )}

                {/* <Link href="/admin">Go to Admin Page</Link> */}
            </ul>
        </>
    )
}