import { courses } from "@/data/TempDB";

import Course, { CourseCardInfo } from "@/types/Course";

const pageSize = 6;

export function getMostPopularCourses(count: number = pageSize): CourseCardInfo[] {
    const end = Math.min(count, courses.length);
    return courses.sort((a, b) => b.purchaseCount - a.purchaseCount).slice(0, end).map(course => course.info);
}

export function getNewestCourses(count: number = pageSize): CourseCardInfo[] {
    const end = Math.min(count, courses.length);
    return courses.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, end).map(course => course.info);
}

export function getSearchCourses(searchTerm: string, tags: string[], priceFrom?: number, priceTo?: number, count: number = pageSize): CourseCardInfo[] {
    const end = Math.min(count, courses.length);

    return courses.filter(course => {
        const matchesSearchTerm = course.info.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.info.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTags = tags.length === 0 || tags.every(tag => course.details.tags.includes(tag));
        const matchesPrice = (priceFrom === undefined || course.info.price >= priceFrom) && (priceTo === undefined || course.info.price <= priceTo);
        return matchesSearchTerm && matchesTags && matchesPrice;
    }).slice(0, end).map(course => course.info);
}

export function getCourse(courseId: number): Course | undefined {
    return courses.find(course => course.info.id === courseId);
}