import { CourseRow } from "@/lib/dbTypes";
import CourseCard from "./CourseCard";

export default function CourseList({ courseCards: courseRows, onSelectCourse }: { courseCards: CourseRow[], onSelectCourse: (courseId: number) => void }) {
    
    return (
        <>
            <div>
                <h2>Course List</h2>
                <button>View All</button>
                <ul>
                    {courseRows?.map((courseCard) => (
                        <li key={courseCard.id}>
                            <CourseCard courseRow={courseCard} onClick={() => onSelectCourse(courseCard.id)} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}