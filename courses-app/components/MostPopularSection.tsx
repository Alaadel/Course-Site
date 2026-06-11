'use client';

import { getMostPopularCourses } from "@/lib/courses";
import CourseList from "./courses/CourseList";
import { CourseCardInfo } from "@/types/Course";
import { useEffect, useState } from "react";

export default function MostPopularSection() {
    const [courses, setCourses] = useState<CourseCardInfo[]>([]);

    async function fetchCourses() {
        const popularCourses = await getMostPopularCourses();
        setCourses(popularCourses);
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
            <CourseList courseCards={courses} onSelectCourse={handleSelectCourse} />
        </>
    )
}