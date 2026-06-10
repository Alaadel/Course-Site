import Link from "next/link";

export default function Account() {
    return (
        <>
            <h1>Account Page</h1>
            <p>This is where you can view and manage your account details.</p>
            <Link href="/">Go back to Home</Link>
        </>
    );
}