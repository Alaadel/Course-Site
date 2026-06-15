import Button from "@/components/common/Button";
import HeaderSub from "@/components/common/HeaderSub";

export default function AdminCoursesPage() {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <HeaderSub className="text-2xl font-bold" hNumber={2} header="Courses" sub="" />
                <Button>Add Course</Button>
            </div>
        </>
    );
}