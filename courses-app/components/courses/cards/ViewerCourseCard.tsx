'use client';

import "@/app/globals.css";
import Button from "@/components/common/Button";
import { ICourseCardComponent } from "../CourseList";
import SectionCard from "@/components/common/containers/SectionCard";

export type ViewerCourseCardData = {
    isOwned: boolean;
}

export default function ViewerCourseCard({ courseData, onClick }: ICourseCardComponent<ViewerCourseCardData>) {
    const { course } = courseData;
    const data = courseData.data as ViewerCourseCardData;

    if (!course || !data) {
        return <p className="text-red">Invalid course data.</p>;
    }

    function handleDetailsClick() {
        onClick?.(course.id, "details");
    }
    function handlePurchaseClick() {
        onClick?.(course.id, "purchase");
    }
    function handleOpenClick() {
        onClick?.(course.id, "open");
    }

    return (
        <SectionCard>
            {course.thumbnail_url && (
                <img src={course.thumbnail_url} alt={course.title} className="w-full h-40 object-cover rounded" />
            )}
            <h2>{course.title}</h2>
            <p className="secondary-text">{course.description}</p>
            <div className="flex gap-4 text-sm secondary-text">
                <span>${course.price}</span>
            </div>
            <div className="flex gap-2">
                <Button onClick={handleDetailsClick}>View Details</Button>
                {data.isOwned ? (
                    <Button onClick={handleOpenClick}>Open</Button>
                ) : (
                    <Button onClick={handlePurchaseClick}>Purchase</Button>
                )}
            </div>
        </SectionCard>
    );
}