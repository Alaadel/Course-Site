import CourseCard from "./CourseCard";
import { CourseCardInfo } from "@/types/Course";

export default function CourseList({ courseCards }: { courseCards: CourseCardInfo[] }) {
    return (
        <>
            <div>
                <h2>Course List</h2>
                <button>View All</button>
                <ul>
                    {courseCards?.map((courseCard) => (
                        <li key={courseCard.id}>
                            <CourseCard courseCard={courseCard} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}