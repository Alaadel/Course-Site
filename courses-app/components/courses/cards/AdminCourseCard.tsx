'use client';

import "@/app/globals.css";
import Button from "@/components/common/Button";
import { ICourseCardComponent } from "../CourseList";
import SectionCard from "@/components/common/containers/SectionCard";

export type AdminCourseCardData = {
    totalOrders: number;
    isActive: boolean;
    totalLessons: number;
}

export default function AdminCourseCard({ courseData, onClick }: ICourseCardComponent<AdminCourseCardData>) {
    const { course } = courseData;
    const data = courseData.data as AdminCourseCardData;

    if (!course || !data) {
        return <p className="text-red">Invalid course data.</p>;
    }

    return (
        <SectionCard>
            {course.thumbnail_url && (
                <img src={course.thumbnail_url} alt={course.title} className="w-full h-40 object-cover rounded" />
            )}
            <div className="flex items-center justify-between">
                <h2>{course.title}</h2>
                <span className={`px-2 py-0.5 rounded text-sm font-medium ${data.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                    {data.isActive ? 'Active' : 'Inactive'}
                </span>
            </div>
            <p className="secondary-text">{course.description}</p>
            <div className="flex gap-4 text-sm secondary-text">
                <span>${course.price}</span>
                <span>{data.totalLessons} lessons</span>
                <span>{data.totalOrders} orders</span>
            </div>
            <Button onClick={() => onClick?.(course.id, "edit")}>Edit</Button>
        </SectionCard>
    );
}
