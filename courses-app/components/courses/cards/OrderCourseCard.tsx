'use client';

import "@/app/globals.css";
import Button from "@/components/common/Button";
import { ICourseCardComponent } from "../CourseList";
import SectionCard from "@/components/common/containers/SectionCard";
import { OrderCourseCardData } from "@/lib/dbTypes";

export default function OrderCourseCard({ courseData, onClick }: ICourseCardComponent<OrderCourseCardData>) {
    const { course } = courseData;
    const data = courseData.data as OrderCourseCardData;

    if (!course || !data) {
        return <p className="text-red">Invalid course data.</p>;
    }

    return (
        <SectionCard>
            {course.thumbnail_url && (
                <img src={course.thumbnail_url} alt={course.title} className="w-full h-40 object-cover rounded" />
            )}
            <h2>{course.title}</h2>
            <p className="secondary-text">{course.description}</p>
            <div className="flex gap-4 text-sm secondary-text">
                <span>${data.price}</span>
                <span>Purchased: {new Date(data.purchasedAt).toLocaleDateString()}</span>
            </div>
            <Button onClick={() => onClick?.(course.id, "open")}>Open Course</Button>
        </SectionCard>
    );
}
