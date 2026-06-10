import Image from "next/image";
import Link from "next/link";

import CourseCard from "@/components/coursecard";

import { getCourses } from "@/lib/server";

export default function Home() {
  const courses = getCourses();

  return (
    <>
      <h1>Home Page</h1>

      <div>
        <Link href="/authentication">Go to Authentication Page</Link>
        <Link href="/courses">Go to Courses Page</Link>
        <Link href="/products">Go to Products Page</Link>
        <Link href="/orders">Go to Orders Page</Link>
        <Link href="/account">Go to Account Page</Link>
        <Link href="/admin">Go to Admin Page</Link>
      </div>

      <div>
        <h2>Most Popular</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
