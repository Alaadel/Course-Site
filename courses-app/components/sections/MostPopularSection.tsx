'use client';

import { getPopularCourses } from "@/lib/tables/courses";
import CourseList from "../courses/CourseList";
import { useEffect, useState } from "react";
import { CourseRow } from "@/lib/dbTypes";

export default function MostPopularSection() {
    const [courses, setCourses] = useState<CourseRow[]>([]);

    async function fetchCourses() {
        const popularCourses = await getPopularCourses(6);
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
            <CourseList title="Most Popular Courses" courseCards={courses} onSelectCourse={handleSelectCourse} />
        </>
    )
}