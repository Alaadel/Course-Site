import Link from "next/link";

export default function Authentication() {
    return (
        <>
            <h1>Authentication Page</h1>
            <Link href="/">Go back to Home</Link>

            <button>Login with Google</button>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="/forgot-password">Forgot Password?</a>
            <button>Login</button>
            <button>Register</button>

        </>
    );
}