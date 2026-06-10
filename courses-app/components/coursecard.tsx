import { purchaseCourse } from "@/lib/account";
import Course, { CourseCardInfo } from "@/types/Course";

export default function CourseCard({courseCard: courseCard}: {courseCard: CourseCardInfo}) {
    function handleDetailsClick() {
        // show modal
    }
    function handlePurchaseClick() {
        // purchaseCourse(courseCard.id);
    }

    return (
        <>
            <h2>{courseCard.title}</h2>
            <h3>${courseCard.price}</h3>
            <p>{courseCard.description}</p>

            <button onClick={handleDetailsClick}>View Details</button>
            <button>Purchase</button>
        </>
    );
}