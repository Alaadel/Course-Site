'use client';

import { useContext } from "react";

import CourseList from "@/components/courses/CourseList";
import SearchProducts from "@/components/sections/SearchProducts";
import SearchProductsContext from "@/store/SearchProductsContext";
import { CourseRow } from "@/lib/dbTypes";

export default function Products() {
    const context = useContext(SearchProductsContext);

    return (
        <>
            <SearchProductsContext.Provider value={{ courseRows: [], setCourses: () => {} }}>
                <SearchProducts setContextCourses={(courseRows: CourseRow[]) => context?.setCourses(courseRows) || (() => {})} />
                <header>Showing {context?.courseRows.length} products</header>
                <CourseList title="Products" coursesData={context?.courseRows || []} onClickCourse={() => {}} />
            </SearchProductsContext.Provider>
        </>
    );
}