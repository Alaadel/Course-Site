'use client';

import Course from "@/types/Course";
import CourseIndex from "./index/CourseIndex";
import { CourseProgress_ } from "@/types/Account";
import CourseVideo from "./CourseVideo";
import { CourseViewContext, CourseViewContextProvider } from "@/store/CourseViewContext";
import { useContext, useEffect, useState } from "react";
import CourseContent from "./index/CourseContent";
import { getCourse } from "@/lib/courses";

export default function CourseViewer({ courseId, progress }: { courseId: number, progress: CourseProgress_ | undefined }) {
    const context = useContext(CourseViewContext);

    const [course, setCourse] = useState<Course | undefined>(undefined);

    async function fetchCourseDetails(courseId: number): Promise<Course | undefined> {
        const course = await getCourse(courseId);
        setCourse(course);
        return course;
    }

    useEffect(() => {
        fetchCourseDetails(courseId);
    }, [courseId]);
    
    const section = course?.details.sections[context?.selectedSectionIndex ?? 0];
    const lesson = section?.lessons[context?.selectedLessonIndex ?? 0];

    return (<>
        <button className="btn btn-secondary mb-4">Back to Course List</button>
        <CourseViewContextProvider course={course}>
            <h2>{course?.info.title}</h2>
            <p>{course?.details.instructorName} . {course?.details.level}</p>

            <CourseIndex course={course} progress={progress} />
            <CourseVideo url={lesson?.videoUrl} />

            <button className="btn btn-secondary">Mark as Completed</button>
            <CourseContent content={lesson?.content} />

        </CourseViewContextProvider>
    </>
    );
}