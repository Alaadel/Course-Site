'use client';

import { CourseCardInfo } from "@/types/Course";
import { createContext, useState, ReactNode } from "react";

interface SearchProductsContextType {
    courseCards: CourseCardInfo[];
    setCourses: React.Dispatch<React.SetStateAction<CourseCardInfo[]>>;
}

const SearchProductsContext = createContext<SearchProductsContextType | undefined>(undefined);

export const SearchProductsProvider = ({ children }: { children: ReactNode }) => {
    const [courses, setCourses] = useState<CourseCardInfo[]>([]);

    return (
        <SearchProductsContext.Provider value={{ courseCards: courses, setCourses }}>
            {children}
        </SearchProductsContext.Provider>
    );
};

export default SearchProductsContext;