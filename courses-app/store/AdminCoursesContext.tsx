import { CourseRow } from "@/lib/dbTypes";
import { createContext, useState } from "react";

type AdminCoursesState = 'adding' | 'editing' | 'deleting' | 'viewing';

interface AdminCoursesContextType {
    state: AdminCoursesState;
    selectedCourse?: CourseRow;

    setState: (state: AdminCoursesState) => void;
    setSelectedCourse: (course: CourseRow | null) => void;
}

export const AdminCoursesContext = createContext<AdminCoursesContextType>({
    state: 'viewing',
    setState: () => {},
    setSelectedCourse: () => {},
});

export function AdminCoursesContextProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AdminCoursesState>('viewing');
    const [selectedCourse, setSelectedCourse] = useState<CourseRow | null>(null);

    const snapshot: AdminCoursesContextType = {
        state,
        selectedCourse: selectedCourse ?? undefined,
        setState,
        setSelectedCourse,
    };

    return (
        <AdminCoursesContext.Provider value={snapshot}>
            {children}
        </AdminCoursesContext.Provider>
    );
}