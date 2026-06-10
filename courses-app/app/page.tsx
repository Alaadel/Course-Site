import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Welcome to the Course Site</h1>

      <Link href="/authentication">Go to Authentication Page</Link>
      <Link href="/courses">Go to Courses Page</Link>
      <Link href="/products">Go to Products Page</Link>
      <Link href="/orders">Go to Orders Page</Link>
      <Link href="/account">Go to Account Page</Link>
    </>
  );
}
