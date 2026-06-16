import Button from "@/components/common/Button";
import HeaderSub from "@/components/common/HeaderSub";
import LabeledArea from "@/components/common/LabeledArea";
import LabeledInput from "@/components/common/LabeledInput";
import Modal from "@/components/common/Modal";
import { AdminCoursesContext } from "@/store/AdminCoursesContext";
import { useContext, useRef, useState } from "react";
import LabeledSelect from "@/components/common/LabeledSelect";
import ImagePicker from "@/components/common/image-picker/ImagePicker";
import { uploadImage_ImgBB } from "@/lib/files";
import { getAvailableInstructors } from "@/lib/tables/instructor";
import { getAllTags } from "@/lib/tables/tag";

export default function AdminCourses() {
    // context
    const context = useContext(AdminCoursesContext);

    // state
    const [instructors, setInstructors] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    
    // refs
    // const thumbnailRef = useRef<Im>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const instructorRef = useRef<HTMLSelectElement>(null);
    
    // shortcuts
    const isEdt = context.state === 'editing';
    const isAdd = context.state === 'adding';
    const showCourseModal = isAdd || isEdt;

    // methods
    // fetch
    async function fetchInstructors() {
        try {
            const response = await getAvailableInstructors();
            const instructorNames = response.map((instructor) => instructor.name);
            setInstructors(instructorNames);
        } catch (error) {
            console.error("Error fetching instructors:", error);
        }
    }
    async function fetchTags() {
        try {
            const response = await getAllTags();
            const tagNames = response.map((tag) => tag.name);
            setTags(tagNames);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    }
    
    // handlers
    function handleShowAddCourseModal() {
        context.setState('adding');
        console.log(context);
    }
    function handleShowEditCourseModal() {
        context.setState('editing');
    }
    async function handleSubmitModal(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            console.log("Submitting modal with thumbnail:", thumbnail);
            if (thumbnail) {
                const thumbnailUrl = await uploadImage_ImgBB(thumbnail);
                console.log("thumbnailUrl", thumbnailUrl);
            } else {
                console.log("No thumbnail to upload");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }
    function handleCloseModal() {
        console.log("closing modal");
        context.setState('viewing');
    }
    function handleFileChange(file: File | null) {
        setThumbnail(file);
    }

    // effects
    return (
        <div className="flex items-center justify-between mb-4">
            <HeaderSub className="text-2xl font-bold" hNumber={2} header="Courses" sub="" />
            <Button onClick={handleShowAddCourseModal}>Add Course</Button>

            <Modal open={showCourseModal} onClose={handleCloseModal}>
                <form onSubmit={handleSubmitModal}>
                    <HeaderSub hNumber={3} header={isAdd ? "Add Course" : "Edit Course"} sub="" />
                    <div className="grid grid-cols-1 gap-4">
                        <LabeledInput label="Title" id="title" editable={true} type="text" ref={titleRef} />
                        <LabeledArea label="Description" id="description" ref={descriptionRef} />
                        
                        <LabeledInput label="Price" id="price" editable={true} type="number" ref={priceRef} />
                        <LabeledSelect label="Instructor" id="instructor" options={instructors} ref={instructorRef} allowCustom={true}/>
                        
                        <LabeledInput label="Tags (comma separated)" id="tags" editable={true} type="text" ref={tagsRef} />
                        
                        <ImagePicker label="Thumbnail" id="thumbnail" name="thumbnail" onFileChange={handleFileChange} />

                        <div className="flex justify-between gap-2">
                            <Button className="main-margin" type="button" onClick={handleCloseModal}>Cancel</Button>
                            <Button className="main-margin" type="submit">Submit</Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}