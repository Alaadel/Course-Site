import Course from "@/types/Course";

import { courses } from "@/data/TempDB";

export function getCourses(): Course[] {
    return courses;
}
export function getMostPopularCourses(count: number = 6): Course[] {
    const end = Math.min(count, courses.length);
    return courses.sort((a, b) => b.purchaseCount - a.purchaseCount).slice(0, end);
}
export function getNewestCourses(count: number = 5): Course[] {
    const end = Math.min(count, courses.length);
    return courses.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, end);
}