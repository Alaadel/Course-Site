import { CourseLesson_ } from "@/types/Course";

export default function CourseLesson({ lesson }: { lesson: CourseLesson_ }) {
    return (
        <>
            <h4>{lesson.title}</h4>
            <p>{lesson.content}</p>
            {lesson.videoUrl && <video src={lesson.videoUrl} controls />}
            <p>Length: {lesson.lengthInMinutes} minutes</p>

            {lesson.isCompleted ?? (
                <span className="badge badge-success">Completed</span>
            )}
        </>
    );
}