'use client';

import Link from "next/link";
import { useContext, useRef } from "react";
import { AuthContext } from "@/store/AuthContext";
import SectionCard from "@/components/common/SectionCard";
import HeaderSub from "@/components/common/HeaderSub";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabeledInput";
import Separator from "@/components/common/Separator";
import FeedbackMessage from "@/components/common/FeedbackMessage";

export default function Login() {
    const context = useContext(AuthContext);

    // use refs to get data from dom
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // shortcuts
    const feedbackState = context?.error ? "error" : context?.success ? "success" : null;
    const feedbackMessage = 
        feedbackState === "error" ? context?.error : 
        (feedbackState === "success" ? context?.success : "");

    function handleLogin() {
        console.log("clicked login");
        if (!context) return;
        if (!emailRef.current || !passwordRef.current) return;

        context.signIn(emailRef.current.value, passwordRef.current.value);
    }

    function handleForgotPassword() {
        console.log("clicked forgot password");
        if (!context) return;
        if (!emailRef.current) return;

        context.recoverPassword(emailRef.current.value);
    }
    function handleGoogleLogin() {
        console.log("clicked google login");
        if (!context) return;

        context.loginWithGoogle();
    }

    return (
        <section>
            <HeaderSub className="main-margin" hNumber={1} header="Login" sub="" />

            <SectionCard>
                <div className="flex justify-center main-margin">
                    <Button onClick={handleGoogleLogin}>Login with Google</Button>
                </div>

                <Separator />

                <LabeledInput label="Email" type="email" ref={emailRef} editable={true} />
                <LabeledInput label="Password" type="password" ref={passwordRef} editable={true} />

                <div className="flex justify-between items-center main-margin">
                    <Button onClick={handleForgotPassword}>Forgot Password?</Button>
                    <Button color="bg-red" onClick={handleLogin}>Login</Button>
                </div>

                <div className="flex justify-center">
                    <p>Need an account? <Link href="/register">Register</Link></p>
                </div>

                <FeedbackMessage state={feedbackState} message={feedbackMessage} />
            </SectionCard>
        </section>
    );
}