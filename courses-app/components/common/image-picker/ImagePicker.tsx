'use client';

import { useRef, useState } from "react"
import Button from "../Button";
import Image from "next/image";
import classes from "./image-picker.module.css";

export default function ImagePicker({ label, id, name, onFileChange, ...props }: { label: string, id: string, name: string, onFileChange?: (file: File | null) => void } & React.InputHTMLAttributes<HTMLInputElement>) {
    const [pickedImage, setPickedImage] = useState<File | null>(null);

    const imageInputRef = useRef<HTMLInputElement>(null);

    function setFile(file: File | null) {
        console.log("setting file", file);

        setPickedImage(file);
        if (onFileChange) {
            onFileChange(file);
        }
    }
    function handleImagePick() {
        imageInputRef.current?.click();
    }
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null;
        if (!file) {
            setFile(null);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFile(file);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={id} className="secondary-text">{label}</label>
            <div className={classes.controls}>
                <input type="file" accept="image/*" ref={imageInputRef}
                    name={name} id={id} className="hidden" onChange={handleImageChange} {...props} />

                <div className={classes.preview}>
                    {pickedImage && (
                        <Image src={URL.createObjectURL(pickedImage)} alt="Picked Image" fill />
                    )}
                </div>

                <Button type="button" onClick={handleImagePick}>Pick Image</Button>
            </div>
        </div>
    )
}