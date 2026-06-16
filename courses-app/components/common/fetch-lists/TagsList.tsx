import { useRef, useState } from "react";

export default function TagsList({ tags, getSelectedTags, allowAdd = false, onAdd }: { tags: string[], getSelectedTags?: (tags: string[]) => void, allowAdd?: boolean, onAdd?: (tag: string) => void }) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const addTagInputRef = useRef<HTMLInputElement>(null);

    function toggleTag(tag: string) {
        let newSelectedTags: string[];
        if (selectedTags.includes(tag)) {
            newSelectedTags = selectedTags.filter(t => t !== tag);
        } else {
            newSelectedTags = [...selectedTags, tag];
        }
        setSelectedTags(newSelectedTags);
        if (getSelectedTags) {
            getSelectedTags(newSelectedTags);
        }
    }

    const selectedStyle = "bg-blue-500 text-white";
    const unselectedStyle = "bg-gray-200 text-gray-800";
    function isSelected(tag: string) {
        return selectedTags.includes(tag);
    }

    function handleAddTag() {
        if (addTagInputRef.current && onAdd) {
            onAdd(addTagInputRef.current.value);
            addTagInputRef.current.value = '';
        }
    }

    return (
        <div className="main-margin flex flex-col">
            <label htmlFor="tags" className="secondary-text">Tags</label>

            <div id="tags" className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span key={index}
                        className={`px-2 py-1 rounded 
                    ${isSelected(tag) ? selectedStyle : unselectedStyle}`}
                        onClick={() => toggleTag(tag)}>{tag}</span>
                ))}

                {allowAdd && (
                    <>
                        <span><input ref={addTagInputRef} placeholder="Add a tag..." className="px-2 py-1 rounded border border-gray-300" /></span>
                        <span><button className="px-2 py-1 rounded bg-blue-500 text-white" onClick={handleAddTag}>Add</button></span>
                    </>
                )}
            </div>
        </div>
    );
}