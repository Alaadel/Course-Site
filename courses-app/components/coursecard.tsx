import Course, { CourseCardInfo } from "@/types/Course";

export default function CourseCard({courseCard: courseCard}: {courseCard: CourseCardInfo}) {
    return (
        <>
            <h2>{courseCard.title}</h2>
            <h3>${courseCard.price}</h3>
            <p>{courseCard.description}</p>
            <button>Purchase</button>
        </>
    );
}