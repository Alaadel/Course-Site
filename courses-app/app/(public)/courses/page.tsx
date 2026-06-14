'use client';

import CourseList from "@/components/courses/CourseList";
import CourseViewer from "@/components/courses/viewer/CourseViewer";
import { AccountRow, CourseRow, ProgressRow } from "@/lib/dbTypes";
import { useEffect, useState } from "react";

export default function Courses({ account }: { account: AccountRow }) {
    const [courseCards, setCourseCards] = useState<CourseRow[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [progress, setProgress] = useState<ProgressRow | undefined>(undefined);
    
    async function fetchCourseCards() {
        // Simulate fetching course cards for the account
        const fetchedCourseCards: CourseRow[] = [
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
            
            <CourseList title="Your Courses" courseCards={courseCards} onSelectCourse={handleSelectCourse} />

                {selectedCourseId && (
                    <CourseViewer courseId={selectedCourseId} progress={progress} />
                )}
        </>
    );
}