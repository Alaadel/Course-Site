import { createContext, useState } from "react";

type AdminCoursesState = 'adding' | 'editing' | 'deleting' | 'viewing';

interface AdminCoursesContextType {
    state: AdminCoursesState;
    setState: (state: AdminCoursesState) => void;
}

export const AdminCoursesContext = createContext<AdminCoursesContextType>({
    state: 'viewing',
    setState: () => {},
});

export function AdminCoursesContextProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AdminCoursesState>('viewing');

    const snapshot: AdminCoursesContextType = {
        state,
        setState,
    };

    return (
        <AdminCoursesContext.Provider value={snapshot}>
            {children}
        </AdminCoursesContext.Provider>
    );
}