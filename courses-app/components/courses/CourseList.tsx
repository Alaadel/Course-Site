import CourseCard from "./CourseCard";
import Course, { CourseCardInfo } from "@/types/Course";

export default function CourseList({ courseCards, onSelectCourse }: { courseCards: CourseCardInfo[], onSelectCourse: (courseId: number) => void }) {
    
    return (
        <>
            <div>
                <h2>Course List</h2>
                <button>View All</button>
                <ul>
                    {courseCards?.map((courseCard) => (
                        <li key={courseCard.id}>
                            <CourseCard courseCard={courseCard} onClick={() => onSelectCourse(courseCard.id)} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}