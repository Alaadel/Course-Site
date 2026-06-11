import Course from "@/types/Course";
import CourseSection from "./CourseSection";
import { CourseProgress_ } from "@/types/Account";

export default function CourseIndex({ course, progress }: { course: Course | undefined, progress: CourseProgress_ | undefined }) {
    return (
        <>
            <ul>
                {course?.details.sections.map((section, index) => (
                    <li key={index}>
                        <CourseSection section={section} progress={progress} />
                    </li>
                ))}
            </ul>
        </>
    );
}