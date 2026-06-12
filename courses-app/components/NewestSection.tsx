'use client';

import { getNewestCourses } from "@/lib/tables/courses";
import CourseList from "./courses/CourseList";
import { useEffect, useState } from "react";
import { CourseCardInfo } from "@/types/Course";

export default function NewestSection() {
    const [courseCards, setCourseCards] = useState<CourseCardInfo[]>([]);

    async function fetchCourses() {
        const newestCourses = await getNewestCourses();
        setCourseCards(newestCourses);
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    function handleSelectCourse(courseId: number) {
        // Implement course selection logic here, e.g., navigate to course details page
        console.log("Selected course ID:", courseId);
    }
    
    return (
        <>
            <CourseList courseCards={courseCards} onSelectCourse={handleSelectCourse} />
        </>
    )
}