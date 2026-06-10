import { getNewestCourses } from "@/lib/server";
import CourseList from "./CourseList";

export default function NewestSection() {
    const courses = getNewestCourses();

    return (
        <>
            <CourseList courses={courses} />
        </>
    )
}