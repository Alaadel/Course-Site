import { createContext, useContext, useState } from "react";
import Course_ from "@/types/Course";

interface CourseViewContextValue {
    course: Course_ | undefined;
    selectedSectionIndex: number | null;
    selectedLessonIndex: number | null;
}

export const CourseViewContext = createContext<CourseViewContextValue | undefined>(undefined);

export function useCourseViewContext() {
    const context = useContext(CourseViewContext);
    if (!context) {
        throw new Error("useCourseViewContext must be used within a CourseViewContext.Provider");
    }

    return context;
}

export function CourseViewContextProvider({ course, children }: { course: Course_ | undefined, children: React.ReactNode }) {
    const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
    const [selectedLessonIndex, setSelectedLessonIndex] = useState<number | null>(null);

    return (
        <CourseViewContext.Provider value={{ course, selectedSectionIndex, selectedLessonIndex }}>
            {children}
        </CourseViewContext.Provider>
    );
}