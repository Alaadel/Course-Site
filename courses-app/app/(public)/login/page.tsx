'use client';

import Link from "next/link";
import { useContext, useRef } from "react";
import { AuthContext } from "@/store/AuthContext";

export default function Login() {
    const context = useContext(AuthContext);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function handleLogin() {
        console.log("clicked login");
        context?.signIn(emailRef.current?.value || "", passwordRef.current?.value || "");
    }
    function handleRegister() {

    }
    function handleForgotPassword() {

    }
    function handleGoogleLogin() {

    }

    return (
        <>
            <h1>Login Page</h1>
            <Link href="/">Go back to Home</Link>

            <button onClick={handleGoogleLogin}>Login with Google</button>

            <input type="email" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />

            <button onClick={handleForgotPassword}>Forgot Password?</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>

        </>
    );
}