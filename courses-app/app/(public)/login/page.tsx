'use client';

import Link from "next/link";
import { useContext, useRef } from "react";
import { AuthContext } from "@/store/AuthContext";

export default function Login() {
    const context = useContext(AuthContext);

    // use refs to get data from dom
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    function handleLogin() {
        console.log("clicked login");
        if (!context) return;
        if (!emailRef.current || !passwordRef.current) return;

        context.signIn(emailRef.current.value, passwordRef.current.value);
    }
    function handleRegister() {
        console.log("clicked register");
        if (!context) return;
        if (!emailRef.current || !passwordRef.current) return;

        context.register(emailRef.current.value, passwordRef.current.value);
    }
    function handleForgotPassword() {

    }
    function handleGoogleLogin() {

    }

    return (
        <>
            <h1>Login Page</h1>
            <Link href="/">Home</Link>

            <button onClick={handleGoogleLogin}>Login with Google</button>

            <input type="email" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />

            <button onClick={handleForgotPassword}>Forgot Password?</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>

            {context?.error && <p style={{ color: "red" }}>{context.error}</p>}
        </>
    );
}