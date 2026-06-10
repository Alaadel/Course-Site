import Course from "@/types/Course";

export default function CourseModal({ course }: { course: Course }) {
    return (
        <>
            <dialog open className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Course Details</h3>
                    <div className="modal-action">
                        <button className="btn">Close</button>
                    </div>

                    <p className="py-4">{course.title}</p>
                    <p className="py-4">{course.description}</p>
                    <p className="py-4">Price: ${course.price}</p>
                    <button className="btn btn-primary">Enroll Now</button>

                    <p className="py-4">Instructor: {course.instructorName}</p>
                    <p className="py-4">Level: {course.level}</p>
                    <p className="py-4">Length: {course.lengthInHours} hours</p>
                    <p className="py-4">Tags: {course.tags.join(", ")}</p>

                    
                </form>
            </dialog>
        </>
    );
}