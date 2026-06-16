import { Order_ } from "@/types/Order";
import { getCourse } from "@/lib/tables/courses";
import { useEffect, useState } from "react";
import ViewerCourseCard from "../courses/cards/ViewerCourseCard";
import Course from "@/types/Course";

export default function Order({ order }: { order: Order_ }) {
    const [course, setCourse] = useState<Course | undefined>(undefined);

    async function fetchCourse(courseIds: number[]) {
        const course = await getCourse(courseIds[0]);

        if (course) {
            setCourse(course);
            console.log("Course details:", course);
        } else {
            console.log("Course not found for ID:", courseIds[0]);
        }
    }

    useEffect(() => {
        fetchCourse(order.courseIds);
    }, [order.courseIds]);

    return (
        <>
            <h1>Order Placed on {order.createdAt.toDateString()}</h1>
            {course && <ViewerCourseCard courseRow={course.info} />}
            <p>Amount Paid: ${order.amountPaid}</p>
        </>
    );
}