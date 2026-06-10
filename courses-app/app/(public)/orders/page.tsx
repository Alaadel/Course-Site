import Link from "next/link";

export default function Orders() {
    return (
        <>
            <h1>Orders Page</h1>
            <p>This is where you can view your orders.</p>
            <Link href="/">Go back to Home</Link>
        </>
    );
}