import Course from "@/types/Course";
import CourseIndex from "./viewer/index/CourseIndex";

export default function CourseModal({ course }: { course: Course }) {
    const info = course.info;
    const details = course.details;

    return (
        <>
            <dialog open className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Course Details</h3>
                    <div className="modal-action">
                        <button className="btn">Close</button>
                    </div>

                    <p className="py-4">{course.info.title}</p>
                    <p className="py-4">{info.description}</p>
                    <p className="py-4">Price: ${info.price}</p>
                    <button className="btn btn-primary">Enroll Now</button>

                    <p className="py-4">Instructor: {details.instructorName}</p>
                    <p className="py-4">Level: {details.level}</p>
                    <p className="py-4">Length: {details.lengthInHours} hours</p>
                    <p className="py-4">Tags: {details.tags.join(", ")}</p>
                    <p className="py-4">Total Length: {details.sections.reduce((total, section) => total + section.totalLengthInMinutes, 0)} minutes</p>

                    <CourseIndex course={course} progress={null} />
                </form>
            </dialog>
        </>
    );
}