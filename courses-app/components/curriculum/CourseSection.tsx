import { CourseSection_ } from "@/types/Course";
import CourseLesson from "./CourseLesson";

export default function CourseSection({ section }: { section: CourseSection_ }) {
    return (
        <>
            <h3>{section.title}</h3>
            <ul>
                {section.lessons.map((lesson, index) => (
                    <li key={index}>
                        <CourseLesson lesson={lesson} />
                    </li>
                ))}
            </ul>
        </>
    );
}