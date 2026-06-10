import { getNewestCourses } from "@/lib/courses";
import CourseList from "./CourseList";

export default function NewestSection() {
    const courseCards = getNewestCourses();

    return (
        <>
            <CourseList courseCards={courseCards} />
        </>
    )
}