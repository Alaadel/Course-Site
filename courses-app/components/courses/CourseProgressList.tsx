import { AccountSchema } from "@/types/account";
import Course from "@/types/Course";
import { useEffect, useState } from "react";
import CourseProgress from "./CourseProgress";

export default function CourseProgressList({ account }: { account: AccountSchema }) {
    const [courses, setCourses] = useState<Course[]>([]);

    async function fetchCourses() {
        
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <>
            <h2>Your Course Progress</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course.info.id}>
                        <CourseProgress progress={account.progress} course={course} />
                    </li>
                ))}
            </ul>
        </>
    );
}