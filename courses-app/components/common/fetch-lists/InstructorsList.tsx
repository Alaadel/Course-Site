import { useRef, useState } from "react";
import Button from "../Button";

// input field with dropdown list
// if the input field has a value not in the dropdown list, Add button appears

export default function InstructorsList({ instructors, getSelectedInstructor, onAddInstructor }: { instructors: string[], getSelectedInstructor?: (instructor: string) => void, onAddInstructor?: (instructor: string) => void }) {
    const [selectedInstructor, setSelectedInstructor] = useState<string>('');

    const addInstructorInputRef = useRef<HTMLInputElement>(null);

    function handleSelectInstructor(instructor: string) {
        setSelectedInstructor(instructor);
        if (getSelectedInstructor) {
            getSelectedInstructor(instructor);
        }

    }
    function handleAddInstructor() {
        if (addInstructorInputRef.current && onAddInstructor) {
            onAddInstructor(addInstructorInputRef.current.value);
            addInstructorInputRef.current.value = '';
        }
    }

    const selectedStyle = "bg-blue-500 text-white";
    const normalStyle = "bg-gray-200 text-gray-800";
    const isSelected = (instructor: string) => instructor === selectedInstructor;

    return (
        <div className="main-margin flex flex-col">
            <label htmlFor="instructors" className="secondary-text">Instructor</label>
            <div id="instructors" className="flex flex-wrap gap-2">
                {instructors.map((instructor, index) => (
                    <span key={index}
                        className={`px-2 py-1 rounded 
                        ${isSelected(instructor) ? selectedStyle : normalStyle}`}
                        onClick={() => handleSelectInstructor(instructor)}>{instructor}</span>
                ))}

                <span><input ref={addInstructorInputRef} placeholder="Add an instructor..." className="px-2 py-1 rounded border border-gray-300" /></span>

                <span><Button className="px-2 py-1 rounded bg-blue-500 text-white" onClick={handleAddInstructor}>Add</Button></span>
            </div>
        </div>
    );
}