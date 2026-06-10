import CourseCard from "./CourseCard";
import Course from "@/types/Course";

export default function CourseList({ courses }: { courses: Course[] }) {
    return (
        <>
            <div>
                <h2>Course List</h2>
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