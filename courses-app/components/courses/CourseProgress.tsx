import { CourseRow } from "@/lib/dbTypes";
import { getCourseById } from "@/lib/tables/courses";
import { CourseProgress_ } from "@/lib/tables/progress";
import { useEffect, useState } from "react";

export default function CourseProgress({ progress, courseId }: { progress: CourseProgress_; courseId: number }) {
    const finished = progress.lesson_completed_count;
    const total = progress.lesson_count;
    const progressPercentage = total > 0 ? (finished / total) * 100 : 0;

    const [course, setCourse] = useState<CourseRow | null>(null);

    async function fetchCourse() {
        const course = await getCourseById(courseId);
        setCourse(course);
    }
    
    useEffect(() => {
        fetchCourse();
    }, [courseId]);

    return (
        <>
            <img src={course?.thumbnail_url || ""} alt={course?.title} />
            <h2>{course?.title}</h2>
            <p>{finished}/{total} sections</p>
            <p>Progress: {progressPercentage.toFixed(2)}%</p>
            {/* <p>Last Accessed: {progress.last_accessed ? new Date(progress.last_accessed).toLocaleDateString() : "N/A"}</p> */}
        </>
    );
}