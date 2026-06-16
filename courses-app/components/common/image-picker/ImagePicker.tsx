'use client';

import { useEffect, useRef, useState } from "react"
import Button from "../Button";
import Image from "next/image";
import classes from "./image-picker.module.css";

export default function ImagePicker({ label, id, name, img_src, onFileChange, ...props }: { label: string, id: string, name: string, img_src?: string, onFileChange?: (file: File | null) => void } & React.InputHTMLAttributes<HTMLInputElement>) {
    const [pickedImage, setPickedImage] = useState<File | null>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(img_src || null);

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

    useEffect(() => {
        setImgSrc(pickedImage ? URL.createObjectURL(pickedImage) : img_src || null);

        // Clean up the object URL when the component unmounts or when a new image is picked
        return () => {
            if (imgSrc && imgSrc !== img_src) {
                URL.revokeObjectURL(imgSrc);
            }
        };

    }, [pickedImage, img_src]);

    return (
        <div className={classes.picker}>
            <label htmlFor={id} className="secondary-text">{label}</label>
            <div className={classes.controls}>
                <input type="file" accept="image/*" ref={imageInputRef}
                    name={name} id={id} className="hidden" onChange={handleImageChange} {...props} />

                <div className={classes.preview}>
                    {imgSrc && <Image src={imgSrc} alt="Picked Image" fill />}
                </div>

                <Button type="button" onClick={handleImagePick}>Pick Image</Button>
            </div>
        </div>
    )
}