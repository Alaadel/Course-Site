import { getMostPopularCourses } from "@/lib/server";
import CourseCard from "./CourseCard";

export default function MostPopularSection() {
    const courses = getMostPopularCourses();
    
    return (
        <>
            <div>
                <h2>Most Popular: sorted by purchase count</h2>
                <button>View All</button>
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>
                            <CourseCard course={course} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}