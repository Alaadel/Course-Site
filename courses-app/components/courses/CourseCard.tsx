'use client';

import { CourseRow } from "@/lib/dbTypes";

export default function CourseCard({courseRow, onClick}: {courseRow: CourseRow, onClick?: (courseId: number) => void}) {
    function handleDetailsClick() {
        onClick?.(courseRow.id);
    }
    function handlePurchaseClick() {
        // purchaseCourse(courseRow.id);
    }

    return (
        <>
            <h2>{courseRow.title}</h2>
            <h3>${courseRow.price}</h3>
            <p>{courseRow.description}</p>

            <button onClick={handleDetailsClick}>View Details</button>
            <button onClick={handlePurchaseClick}>Purchase</button>
        </>
    );
}