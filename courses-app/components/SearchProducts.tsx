import Link from "next/link";

export default function SearchProducts() {
    return (
        <>
            <h1>Products Page</h1>
            <Link href="/">Go back to Home</Link>

            <input type="text" placeholder="Search products..." />
            <input type="text" placeholder="Tags ..." />

            <input type="number" placeholder="Price from ..." />
            <input type="number" placeholder="Price to ..." />

            <button>Search</button>
        </>
    );
}