import { getMostPopularCourses } from "@/lib/server";
import CourseList from "./CourseList";

export default function MostPopularSection() {
    const courses = getMostPopularCourses();
    
    return (
        <>
            <CourseList courses={courses} />
        </>
    )
}