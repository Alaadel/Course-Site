'use client';

import { getNewestCourses } from "@/lib/tables/courses";
import CourseList from "./courses/CourseList";
import { useEffect, useState } from "react";
import { CourseRow } from "@/lib/dbTypes";

export default function NewestSection() {
    const [courseCards, setCourseCards] = useState<CourseRow[]>([]);

    async function fetchCourses() {
        const newestCourses = await getNewestCourses(6);
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