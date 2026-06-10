import Course from "@/types/Course";
import { createContext, useState, ReactNode } from "react";

interface SearchProductsContextType {
    courses: Course[];
    setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}

const SearchProductsContext = createContext<SearchProductsContextType | undefined>(undefined);

export const SearchProductsProvider = ({ children }: { children: ReactNode }) => {
    const [courses, setCourses] = useState<Course[]>([]);

    return (
        <SearchProductsContext.Provider value={{ courses, setCourses }}>
            {children}
        </SearchProductsContext.Provider>
    );
};

export default SearchProductsContext;