import { CourseRow } from "@/lib/dbTypes";
import styles from "./CourseList.module.css";

export interface CourseDataType<T> {
    course: CourseRow;
    data: T;
}

export interface ICourseCardComponent<T> {
    courseData: CourseDataType<T>;
    onClick?: (courseId: number, clickType: string) => void;
}

export default function CourseList<T>({
    coursesData,
    onSelectCourse,
    CardComponent
}: {
    coursesData?: CourseDataType<T>[],
    onSelectCourse: (courseId: number) => void,
    CardComponent: React.ComponentType<ICourseCardComponent<T>>
}) {
    return (
        <div className={styles.CourseList}>
            <ul>
                {coursesData?.map((courseData) => (
                    <li key={courseData.course.id}>
                        <CardComponent
                            courseData={courseData}
                            onClick={(courseId, clickType) => onSelectCourse(courseId)}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}