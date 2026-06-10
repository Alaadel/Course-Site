import Course from "@/types/Course";

export default function CourseCard({course}: {course: Course}) {
    return (
        <>
            <h2>{course.title}</h2>
            <h3>${course.price}</h3>
            <p>{course.description}</p>
            <button>Purchase</button>
        </>
    );
}