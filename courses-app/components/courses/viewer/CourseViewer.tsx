import Course from "@/types/Course";
import CourseIndex from "./index/CourseIndex";
import { CourseProgress_ } from "@/types/Account";
import CourseVideo from "./CourseVideo";
import { CourseViewContext, CourseViewContextProvider } from "@/store/CourseViewContext";
import { useContext } from "react";
import CourseContent from "./index/CourseContent";

export default function CourseViewer({ course, progress }: { course: Course, progress: CourseProgress_ | null }) {
    const context = useContext(CourseViewContext);
    const section = course.details.sections[context?.selectedSectionIndex ?? 0];
    const lesson = section.lessons[context?.selectedLessonIndex ?? 0];

    return (
        <CourseViewContextProvider course={course}>
            <h2>{course.info.title}</h2>
            <p>{course.details.instructorName} . {course.details.level}</p>

            <CourseIndex course={course} progress={progress} />
            <CourseVideo url={lesson.videoUrl} />

            <button className="btn btn-secondary">Mark as Completed</button>
            <CourseContent content={lesson.content} />

        </CourseViewContextProvider>
    );
}