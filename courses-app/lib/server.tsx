import Course from "@/types/Course";

import { courses } from "@/data/TempDB";

// Courses
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

export function getSearchCourses(searchTerm: string, tags: string[], priceFrom?: number, priceTo?: number): Course[] {
    return courses.filter(course => {
        const matchesSearchTerm = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTags = tags.length === 0 || tags.every(tag => course.tags.includes(tag));
        const matchesPrice = (priceFrom === undefined || course.price >= priceFrom) && (priceTo === undefined || course.price <= priceTo);
        return matchesSearchTerm && matchesTags && matchesPrice;
    });
}