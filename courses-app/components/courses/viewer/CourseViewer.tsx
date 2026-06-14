'use client';

import CourseIndex from "./index/CourseIndex";
import CourseVideo from "./CourseVideo";
import { CourseViewContext, CourseViewContextProvider } from "@/store/CourseViewContext";
import { useContext, useEffect, useState } from "react";
import CourseContent from "./index/CourseContent";
import { CourseRow, ProgressRow } from "@/lib/dbTypes";
import { getCourseById } from "@/lib/tables/courses";

export default function CourseViewer({ courseId, progress }: { courseId: number, progress: ProgressRow | undefined }) {
    const context = useContext(CourseViewContext);

    const [course, setCourse] = useState<CourseRow | undefined>(undefined);

    async function fetchCourseDetails(courseId: number): Promise<CourseRow | undefined> {
        const course = await getCourseById(courseId);
        setCourse(course);
        return course;
    }

    useEffect(() => {
        fetchCourseDetails(courseId);
    }, [courseId]);
    
    // const section = course?.sections[context?.selectedSectionIndex ?? 0];
    // const lesson = section?.lessons[context?.selectedLessonIndex ?? 0];

    return (<>
        <button className="btn btn-secondary mb-4">Back to Course List</button>
        <CourseViewContextProvider course={course}>
            <h2>{course?.title}</h2>
            {/* <p>{course?.instructorName} . {course?.level}</p> */}

            <CourseIndex course={course} progress={progress} />
            {/* <CourseVideo url={lesson?.videoUrl} /> */}

            <button className="btn btn-secondary">Mark as Completed</button>
            {/* <CourseContent content={lesson?.content} /> */}

        </CourseViewContextProvider>
    </>
    );
}