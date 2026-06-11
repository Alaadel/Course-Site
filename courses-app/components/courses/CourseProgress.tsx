import { CourseProgress_ } from "@/types/Account";
import Course, { CourseCardInfo } from "@/types/Course";

export default function CourseProgress({ progress, course }: { progress: CourseProgress_[]; course: Course }) {
    const sectionsFinished = progress.find(p => p.courseId === course.info.id)?.sectionsFinished || 0;
    const totalSections = course.details.sections.length || 0;
    const progressPercentage = totalSections > 0 ? (sectionsFinished / totalSections) * 100 : 0;

    return (
        <>
            <img src={course.info.imageUrl} alt={course.info.title} />
            <h2>{course.info.title}</h2>
            <p>{sectionsFinished}/{totalSections} sections</p>
            <p>Progress: {progressPercentage.toFixed(2)}%</p>
            <p>Last Accessed: {progress.find(p => p.courseId === course.info.id)?.lastAccessed.toLocaleDateString() || "N/A"}</p>
        </>
    );
}