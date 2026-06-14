'use client';

import { CourseRow } from "@/lib/dbTypes";
import { createContext, useContext, useState } from "react";

interface CourseViewContextValue {
    course: CourseRow | undefined;
    selectedSectionIndex: number | null;
    selectedLessonIndex: number | null;
}

export const CourseViewContext = createContext<CourseViewContextValue | undefined>(undefined);

export function CourseViewContextProvider({ course, children }: { course: CourseRow | undefined, children: React.ReactNode }) {
    // state drives the snapshot. snapshot is automatically updated when state changes
    const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
    const [selectedLessonIndex, setSelectedLessonIndex] = useState<number | null>(null);

    // snapshot, accessed by the context consumers
    const contextValue: CourseViewContextValue = {
        // passing the state values directly to the context value
        course,
        selectedSectionIndex,
        selectedLessonIndex,
    };

    return (
        // calling the provider + passing the snapshot
        <CourseViewContext.Provider value={contextValue}>
            {children}
        </CourseViewContext.Provider>
    );
}