import { CourseRow } from "@/lib/dbTypes";
import CourseCard from "./CourseCard";
import styles from "./CourseList.module.css";

export default function CourseList({ title, courseCards: courseRows, onSelectCourse }: { title: string, courseCards: CourseRow[], onSelectCourse: (courseId: number) => void }) {
    
    return (
        <>
            <div className={styles.CourseList}>
                <h2>{title}</h2>
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