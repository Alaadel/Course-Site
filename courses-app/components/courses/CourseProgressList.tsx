import { useEffect, useState } from "react";
import CourseProgress from "./CourseProgress";
import { AccountCourseProgress, getAccountCourseProgress } from "@/lib/tables/progress";

export default function CourseProgressList({ account_id }: { account_id: string }) {
    const [accountCourseProgress, setAccountCourseProgress] = useState<AccountCourseProgress[]>([]);
    
    async function fetchCourses() {
        const courses_ids = await getAccountCourseProgress(account_id);
        setAccountCourseProgress(courses_ids);
    }

    useEffect(() => {
        fetchCourses();
    }, [account_id]);

    return (
        <>
            <h2>Your Course Progress</h2>
            <ul>
                {accountCourseProgress.map((courseProgress) => (
                    <li key={courseProgress.courseId}>
                        <CourseProgress progress={courseProgress.progress} courseId={courseProgress.courseId} />
                    </li>
                ))}
            </ul>
        </>
    );
}