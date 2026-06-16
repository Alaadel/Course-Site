import Button from "@/components/common/Button";
import HeaderSub from "@/components/common/HeaderSub";
import LabeledArea from "@/components/common/labeled/LabeledArea";
import LabeledInput from "@/components/common/labeled/LabeledInput";
import Modal from "@/components/common/containers/Modal";
import { AdminCoursesContext } from "@/store/AdminCoursesContext";
import { useContext, useEffect, useState } from "react";
import ImagePicker from "@/components/common/image-picker/ImagePicker";
import { uploadImage_ImgBB } from "@/lib/files";
import { createInstructor, getAvailableInstructors } from "@/lib/tables/instructor";
import { createTag, getAllTags } from "@/lib/tables/tag";
import TagsList from "@/components/common/fetch-lists/TagsList";
import InstructorsList from "@/components/common/fetch-lists/InstructorsList";
import FeedbackMessage, { Feedback } from "@/components/common/FeedbackMessage";
import { createCourse, getAllCourses } from "@/lib/tables/courses";
import { InstructorDataType } from "@/lib/tables/instructor";
import { CourseRow } from "@/lib/dbTypes";
import CourseList, { CourseDataType } from "@/components/courses/CourseList";
import AdminCourseCard from "@/components/courses/cards/AdminCourseCard";
import { AdminCourseCardData } from "@/lib/dbTypes";

export default function AdminCourses() {
    // context
    const context = useContext(AdminCoursesContext);

    // state
    const [courses, setCourses] = useState<CourseRow[]>([]);
    const [adminCourses, setAdminCourses] = useState<CourseDataType<AdminCourseCardData>[]>([]);
    const [instructors, setInstructors] = useState<InstructorDataType[]>([]);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [feedbackMessage, setFeedbackMessage] = useState<Feedback | null>(null);
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        price: '',
        instructorName: '',
    });

    // shortcuts
    const isEdt = context.state === 'editing';
    const isAdd = context.state === 'adding';
    const showCourseModal = isAdd || isEdt;

    // methods
    // fetch
    async function fetchCourses() {
        try {
            const response = await getAllCourses();
            setCourses(response);

            const adminCoursesData: CourseDataType<AdminCourseCardData>[] = response.map((course) => ({
                course,
                data: {
                    totalLessons: 0,
                    isActive: course.active,
                    totalOrders: 0,
                }
            }));
            setAdminCourses(adminCoursesData);

        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }
    async function fetchInstructors() {
        try {
            const response = await getAvailableInstructors();
            const instructorData = response.map((instructor) => ({ name: instructor.name, id: instructor.id }));
            setInstructors(instructorData);
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

    // helpers
    const getInstructorId = (instructorName: string): number | null => {
        const instructor = instructors.find((i) => i.name === instructorName);
        return instructor ? instructor.id : null;
    }

    // handlers
    function handleShowAddCourseModal() {
        context.setState('adding');
    }
    function handleShowEditCourseModal(course: CourseRow) {
        context.setState('editing');
    }
    async function handleSubmitModal(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            console.log("Submitting modal with thumbnail:", thumbnail);
            if (thumbnail) {
                const thumbnailUrl = await uploadImage_ImgBB(thumbnail);
                console.log("thumbnailUrl", thumbnailUrl);

                const instructorId = getInstructorId(formValues.instructorName);
                if (instructorId === null) {
                    console.error("Invalid instructor selected");
                    setFeedbackMessage({ type: 'error', message: 'Invalid instructor selected' });
                    return;
                }

                const course_response = await createCourse({
                    title: formValues.title,
                    description: formValues.description,
                    price: parseFloat(formValues.price || '0'),
                    instructor_id: instructorId,
                    tags: selectedTags,
                    thumbnail_url: thumbnailUrl,
                    active: true,
                });
                setCourses([...courses, course_response]);

                const adminCourseData: CourseDataType<AdminCourseCardData> = {
                    course: course_response,
                    data: {
                        totalLessons: 0,
                        isActive: course_response.active,
                        totalOrders: 0,
                    }
                };
                setAdminCourses([...adminCourses, adminCourseData]);

                console.log("Course created successfully:", course_response);
                setFeedbackMessage({ type: 'success', message: 'Course created successfully' });

                handleCloseModal();
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

    function handleSelectedTags(selectedTags: string[]) {
        console.log("Selected tags:", selectedTags);
        setSelectedTags(selectedTags);
    }
    async function handleAddTag(tag: string) {
        if (tags.includes(tag)) {
            console.log("Tag already exists:", tag);
            setFeedbackMessage({ type: 'error', message: 'Tag already exists' });
            return;
        }

        try {
            const newTag = await createTag(tag);
            setTags([...tags, newTag.name]);
            setFeedbackMessage({ type: 'success', message: 'Tag created successfully' });
        } catch (error) {
            console.error("Error creating tag:", error);
            setFeedbackMessage({ type: 'error', message: 'Error creating tag' });
        }
    }

    async function handleAddInstructor(instructor: string) {
        if (instructors.some((i) => i.name === instructor)) {
            console.log("Instructor already exists:", instructor);
            setFeedbackMessage({ type: 'error', message: 'Instructor already exists' });
            return;
        }

        try {
            const newInstructor = await createInstructor(instructor);
            setInstructors([...instructors, { name: newInstructor.name, id: newInstructor.id }]);
            setFeedbackMessage({ type: 'success', message: 'Instructor created successfully' });
        } catch (error) {
            console.error("Error creating instructor:", error);
            setFeedbackMessage({ type: 'error', message: 'Error creating instructor' });
        }
    }
    function handleSelectedInstructor(instructor: string) {
        setFormValues(prev => ({ ...prev, instructorName: instructor }));
    }

    function handleSelectCourse(courseId: number) {
        const selectedCourse = courses.find((c) => c.id === courseId) || null;
        if (selectedCourse) {
            context.setSelectedCourse(selectedCourse);
            handleShowEditCourseModal(selectedCourse);
        }
    }

    // populate form when editing — reactive to both selectedCourse and instructors loading
    useEffect(() => {
        if (isEdt && context.selectedCourse) {
            const instructorName = instructors.find(i => i.id === context.selectedCourse?.instructor_id)?.name || '';
            setFormValues({
                title: context.selectedCourse.title || '',
                description: context.selectedCourse.description || '',
                price: context.selectedCourse.price?.toString() || '',
                instructorName,
            });
            setSelectedTags(context.selectedCourse.tags || []);
        }
    }, [context.selectedCourse, instructors, isEdt]);

    // clear form when modal closes
    useEffect(() => {
        if (!showCourseModal) {
            console.log("Clearing form values and selected tags");
            setFormValues({ title: '', description: '', price: '', instructorName: '' });
            setSelectedTags([]);
        }
    }, [showCourseModal]);

    // fetch courses on mount
    useEffect(() => {
        fetchCourses();
    }, []);

    // effects
    // initialize effect — fetch instructors/tags when modal opens, clean them up on close
    useEffect(() => {
        setFeedbackMessage(null);

        if (showCourseModal) {
            fetchInstructors();
            fetchTags();
        }

        // cleanup
        return () => {
            setInstructors([]);
            setTags([]);
            setFeedbackMessage(null);
        }
    }, [showCourseModal]);

    return (
        <div>
            <Modal open={showCourseModal} onClose={handleCloseModal}>
                <form onSubmit={handleSubmitModal}>
                    <HeaderSub hNumber={3} header={isAdd ? "Add Course" : `Edit: ${context.selectedCourse?.title}`} sub="" />
                    <div className="grid grid-cols-1 gap-4">
                        <LabeledInput label="Title" id="title" editable={true} type="text" value={formValues.title} onChange={e => setFormValues(prev => ({ ...prev, title: e.target.value }))} />
                        <LabeledArea label="Description" id="description" value={formValues.description} onChange={e => setFormValues(prev => ({ ...prev, description: e.target.value }))} />

                        <LabeledInput label="Price" id="price" editable={true} type="number" value={formValues.price} onChange={e => setFormValues(prev => ({ ...prev, price: e.target.value }))} />

                        <InstructorsList instructors={instructors} value={formValues.instructorName} getSelectedInstructor={handleSelectedInstructor} onAddInstructor={handleAddInstructor} />

                        <TagsList tags={tags} getSelectedTags={handleSelectedTags} allowAdd={true} onAdd={handleAddTag} />

                        <ImagePicker label="Thumbnail" id="thumbnail" name="thumbnail" img_src={context.selectedCourse?.thumbnail_url || ""} onFileChange={handleFileChange} />

                        <FeedbackMessage feedback={feedbackMessage} />

                        <div className="flex justify-between gap-2">
                            <Button className="main-margin" type="button" onClick={handleCloseModal}>Cancel</Button>
                            <Button className="main-margin" type="submit">Submit</Button>
                        </div>
                    </div>
                </form>
            </Modal>

            <div className="flex items-center justify-between mb-4">
                <HeaderSub className="text-2xl font-bold" hNumber={2} header="Courses" sub="" />
                <Button onClick={handleShowAddCourseModal}>Add Course</Button>
            </div>

            <CourseList<AdminCourseCardData> coursesData={adminCourses} onSelectCourse={handleSelectCourse} CardComponent={AdminCourseCard} />
        </div>
    );
}