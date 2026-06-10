'use client';

import { useContext } from "react";

import CourseList from "@/components/CourseList";
import SearchProducts from "@/components/SearchProducts";
import SearchProductsContext from "@/store/SearchProductsContext";
import Course from "@/types/Course";

export default function Products() {
    const context = useContext(SearchProductsContext);

    return (
        <>
            <SearchProductsContext.Provider value={{ courses: [], setCourses: () => {} }}>
                <SearchProducts setContextCourses={(courses: Course[]) => context?.setCourses(courses) || (() => {})} />
                <header>Showing {context?.courses.length} products</header>
                <CourseList courses={context?.courses || []} />
            </SearchProductsContext.Provider>
        </>
    );
}