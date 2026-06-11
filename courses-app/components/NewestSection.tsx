'use client';

import { getNewestCourses } from "@/lib/courses";
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

    return (
        <>
            <CourseList courseCards={courseCards} />
        </>
    )
}