import { getNewestCourses } from "@/lib/server";
import CourseCard from "./CourseCard";

export default function NewestSection() {
    const courses = getNewestCourses();

    return (
        <>
            <div>
                <h2>Newest: sorted by creation date</h2>
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
    );
}