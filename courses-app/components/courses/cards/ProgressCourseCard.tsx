'use client';

import "@/app/globals.css";
import Button from "@/components/common/Button";
import { ICourseCardComponent } from "../CourseList";
import SectionCard from "@/components/common/containers/SectionCard";

export type ProgressCourseCardData = {
    lessonsFinished: number;
    totalLessons: number;
}

export default function ProgressCourseCard({ courseData, onClick }: ICourseCardComponent<ProgressCourseCardData>) {
    const { course } = courseData;
    const data = courseData.data as ProgressCourseCardData;

    if (!course || !data) {
        return <p className="text-red">Invalid course data.</p>;
    }

    const progressPercentage = (data.lessonsFinished / data.totalLessons) * 100;
    const pct = Math.min(100, Math.max(0, progressPercentage));

    return (
        <SectionCard>
            {course.thumbnail_url && (
                <img src={course.thumbnail_url} alt={course.title} className="w-full h-40 object-cover rounded" />
            )}
            <h2>{course.title}</h2>
            <p className="secondary-text">{course.description}</p>
            <div className="flex gap-4 text-sm secondary-text">
                <span>${course.price}</span>
                <span>{data.totalLessons} lessons</span>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                    <span>{data.lessonsFinished} / {data.totalLessons} lessons</span>
                    <span>{pct}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>

            <Button onClick={() => onClick?.(course.id, "open")}>Continue</Button>
        </SectionCard>
    );
}
