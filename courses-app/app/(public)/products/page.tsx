'use client';

import { useContext } from "react";

import CourseList from "@/components/CourseList";
import SearchProducts from "@/components/SearchProducts";
import SearchProductsContext from "@/store/SearchProductsContext";
import { CourseCardInfo } from "@/types/Course";

export default function Products() {
    const context = useContext(SearchProductsContext);

    return (
        <>
            <SearchProductsContext.Provider value={{ courseCards: [], setCourses: () => {} }}>
                <SearchProducts setContextCourses={(courseCards: CourseCardInfo[]) => context?.setCourses(courseCards) || (() => {})} />
                <header>Showing {context?.courseCards.length} products</header>
                <CourseList courseCards={context?.courseCards || []} />
            </SearchProductsContext.Provider>
        </>
    );
}