import CourseCard from "./CourseCard";
import Course, { CourseCardInfo } from "@/types/Course";

export default function CourseList({ courseCards }: { courseCards: CourseCardInfo[] }) {
    return (
        <>
            <div>
                <h2>Course List</h2>
                <button>View All</button>
                <ul>
                    {courseCards.map((course) => (
                        <li key={course.id}>
                            <CourseCard courseCard={course} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}