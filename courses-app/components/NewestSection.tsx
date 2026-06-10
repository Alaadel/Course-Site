import { getNewestCourses } from "@/lib/courses";
import CourseList from "./CourseList";

export default function NewestSection() {
    const courses = getNewestCourses();

    return (
        <>
            <CourseList courses={courses} />
        </>
    )
}