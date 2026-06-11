import CourseList from "@/components/courses/CourseList";
import CourseViewer from "@/components/courses/viewer/CourseViewer";
import { Account } from "@/types/Account";
import Course, { CourseCardInfo } from "@/types/Course";
import { useEffect, useState } from "react";

export default function Courses({ account }: { account: Account }) {
    const [courseCards, setCourseCards] = useState<CourseCardInfo[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    async function fetchCourseCards() {
        // Simulate fetching course cards for the account
        const fetchedCourseCards: CourseCardInfo[] = [
            // Add your simulated course card data here
        ];
        setCourseCards(fetchedCourseCards);
    }

    useEffect(() => {
        fetchCourseCards();
    }, [account]);

    function handleSelectCourse(courseId: number) {
        const courseCard = courseCards.find(course => course.id === courseId);
        if (courseCard) {
            setSelectedCourseId(courseCard.id);
        } else {
            console.error("Course not found for ID:", courseId);
        }
    }

    return (
        <>
            <h1>Courses Page</h1>
            <p>This is where you can view your courses.</p>
            
            <CourseList courseCards={courseCards} onSelectCourse={handleSelectCourse} />

                {selectedCourseId && (
                    <CourseViewer courseId={selectedCourseId} progress={account.getCourseProgress(selectedCourseId)} />
                )}
        </>
    );
}