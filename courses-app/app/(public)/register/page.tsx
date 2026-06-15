'use client';

import Button from "@/components/common/Button";
import FeedbackMessage from "@/components/common/FeedbackMessage";
import HeaderSub from "@/components/common/HeaderSub";
import LabeledInput from "@/components/common/LabeledInput";
import LinkStyled from "@/components/common/LinkStyled";
import SectionCard from "@/components/common/SectionCard";
import { AuthContext } from "@/store/AuthContext";
import Link from "next/dist/client/link";
import { useContext, useRef } from "react";

export default function Register() {
    const context = useContext(AuthContext);

    // use refs to get data from dom
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    // shortcuts
    const feedbackState = context?.error ? "error" : context?.success ? "success" : null;
    const feedbackMessage =
        feedbackState === "error" ? context?.error :
            (feedbackState === "success" ? context?.success : "");

    function handleFormSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;

        handleRegister(email, password, firstName, lastName);
    }
    function handleRegister(email: string, password: string, firstName: string, lastName: string) {
        console.log(`handleRegister ${email} ${firstName} ${lastName}`);

        if (!context) return;

        context.register(email, password, firstName, lastName);
    }

    return (
        <section>
            <HeaderSub className="main-margin" hNumber={1} header="Register" sub="" />

            <SectionCard>
                <form onSubmit={handleFormSubmit}>
                    <LabeledInput name="email" ref={emailRef} type="email" label="Email" editable={true} required={true} />
                    <LabeledInput name="password" ref={passwordRef} type="password" label="Password" editable={true} required={true} />
                    <LabeledInput name="firstName" ref={firstNameRef} type="text" label="First Name" editable={true} required={true} />
                    <LabeledInput name="lastName" ref={lastNameRef} type="text" label="Last Name" editable={true} required={true} />

                    <FeedbackMessage state={feedbackState} message={feedbackMessage} />

                    <div className="flex justify-end items-center main-margin">
                        <Button className="right" type="submit" color="bg-blue">Register</Button>
                    </div>
                </form>

                <div className="flex justify-center">
                    <p>Already registered? <LinkStyled href="/login">Login</LinkStyled></p>
                </div>
            </SectionCard>
        </section>
    );
}