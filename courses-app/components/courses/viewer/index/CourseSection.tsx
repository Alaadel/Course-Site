import { CourseSection_ } from "@/types/Course";
import CourseLesson from "./CourseLesson";
import { CourseProgress_ } from "@/types/account";

export default function CourseSection({ section, progress }: { section: CourseSection_, progress: CourseProgress_ | undefined }) {
    const isCompleted = progress ? progress.sectionsFinished > 0 : false;

    return (
        <>
            <h3>{section.title}</h3>
            <p>Total Length: {section.totalLengthInMinutes} minutes</p>
            {isCompleted && <p className="text-green-500">Completed</p>}

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