'use client';

import { CourseRow } from "@/lib/dbTypes";
import { createContext, useState, ReactNode } from "react";

interface SearchProductsContextType {
    courseCards: CourseRow[];
    setCourses: React.Dispatch<React.SetStateAction<CourseRow[]>>;
}

const SearchProductsContext = createContext<SearchProductsContextType | undefined>(undefined);

export const SearchProductsProvider = ({ children }: { children: ReactNode }) => {
    const [courses, setCourses] = useState<CourseRow[]>([]);

    return (
        <SearchProductsContext.Provider value={{ courseCards: courses, setCourses }}>
            {children}
        </SearchProductsContext.Provider>
    );
};

export default SearchProductsContext;