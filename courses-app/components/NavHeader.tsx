'use client';

import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";
import { useContext } from "react";

export default function NavHeader() {
    const context = useContext(AuthContext);

    return (
        <>
            <ul>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/products">Products</Link></li>

                {context?.isSignedIn ? (
                    <>
                        <li><Link href="/courses">Courses</Link></li>
                        <li><Link href="/orders">Orders</Link></li>
                        <li><Link href="/account">Account</Link></li>
                    </>
                ) : (
                    <></>
                )}

                {/* <Link href="/admin">Go to Admin Page</Link> */}
            </ul>
        </>
    )
}