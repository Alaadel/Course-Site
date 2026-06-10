import Link from "next/link";

export default function Admin() {
    return (
        <>
            <h1>Admin Page</h1>
            <p>This is where you can manage the admin panel.</p>
            <Link href="/">Go back to Home</Link>
        </>
    );
}