import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { InstructorDataType } from "@/lib/tables/instructor";

// input field with dropdown list
// if the input field has a value not in the dropdown list, Add button appears

export default function InstructorsList({ instructors, value, getSelectedInstructor, onAddInstructor }: { instructors: InstructorDataType[], value?: string, getSelectedInstructor?: (instructor: string) => void, onAddInstructor?: (instructor: string) => void }) {
    const [selectedInstructor, setSelectedInstructor] = useState<string>(value ?? '');

    const addInstructorInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSelectedInstructor(value ?? '');
    }, [value]);

    function handleSelectInstructor(instructor: string) {
        setSelectedInstructor(instructor);
        if (getSelectedInstructor) {
            getSelectedInstructor(instructor);
        }

    }
    const [inputValue, setInputValue] = useState<string>('');

    const isNewInstructor = inputValue &&
        (instructors == null || instructors.length === 0 ||
            !instructors.some((i) => i.name === inputValue));

    function handleAddInstructorFromInput() {
        if (inputValue && onAddInstructor) {
            onAddInstructor(inputValue);
            setInputValue('');
        }
    }

    return (
        <div className="main-margin flex flex-col gap-2">
            <label htmlFor="instructors" className="secondary-text">Instructor</label>

            <select
                id="instructors"
                className="border rounded px-2 py-1 bg-gray-200 text-gray-800"
                value={selectedInstructor}
                onChange={(e) => handleSelectInstructor(e.target.value)}>
                <option value="">Select an instructor...</option>
                {instructors.map((instructor, index) => (
                    <option key={index} value={instructor.name}>{instructor.name}</option>
                ))}
            </select>

            <div className="flex gap-2">
                <Input
                    ref={addInstructorInputRef}
                    editable={true}
                    placeholder="Add an instructor..."
                    id="instructor-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}/>

                {isNewInstructor && <Button onClick={handleAddInstructorFromInput}>Add</Button>}
                {!isNewInstructor && <p>Instructor {inputValue} already exists</p>}
            </div>
        </div>
    );
}