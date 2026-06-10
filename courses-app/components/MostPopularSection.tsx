import { getMostPopularCourses } from "@/lib/courses";
import CourseList from "./CourseList";

export default function MostPopularSection() {
    const courses = getMostPopularCourses();
    
    return (
        <>
            <CourseList courses={courses} />
        </>
    )
}