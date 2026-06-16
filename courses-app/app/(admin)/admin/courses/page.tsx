'use client';

import AdminCourses from "@/components/admin/courses/AdminCourses";
import { AdminCoursesContextProvider } from "@/store/AdminCoursesContext";

export default function AdminCoursesPage() {
    return (
        <AdminCoursesContextProvider>
            <AdminCourses />
        </AdminCoursesContextProvider>
    );
}