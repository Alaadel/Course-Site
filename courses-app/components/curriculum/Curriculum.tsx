import Course from "@/types/Course";
import CourseSection from "./CourseSection";

export default function Curriculum({ course }: { course: Course }) {
    return (
        <>
            <ul>
                {course.sections.map((section, index) => (
                    <li key={index}>
                        <CourseSection section={section} />
                    </li>
                ))}
            </ul>
        </>
    );
}