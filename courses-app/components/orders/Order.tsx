import { Order_ } from "@/types/Order";
import { getCourse } from "@/lib/courses";
import { useEffect, useState } from "react";
import CourseCard from "../courses/CourseCard";
import Course from "@/types/Course";

export default function Order({ order }: { order: Order_ }) {
    const [course, setCourse] = useState<Course | undefined>(undefined);

    async function fetchCourse(courseId: number) {
        const course = await getCourse(courseId);

        if (course) {
            setCourse(course);
            console.log("Course details:", course);
        } else {
            console.log("Course not found for ID:", courseId);
        }
    }

    useEffect(() => {
        fetchCourse(order.courseId);
    }, [order.courseId]);

    return (
        <>
            <h1>Order Placed on {order.createdAt.toDateString()}</h1>
            {course && <CourseCard courseCard={course.info} />}
            <p>Amount Paid: ${order.amountPaid}</p>
        </>
    );
}