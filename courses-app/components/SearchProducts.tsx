'use client';

import { getSearchCourses } from "@/lib/tables/courses";
import Course, { CourseCardInfo } from "@/types/Course";
import Link from "next/link";
import { useState } from "react";

export default function SearchProducts({ setContextCourses }: { setContextCourses: (courseCards: CourseCardInfo[]) => void }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [priceFrom, setPriceFrom] = useState<number | undefined>(undefined);
    const [priceTo, setPriceTo] = useState<number | undefined>(undefined);

    async function handleSearchClick() {
        const courses = await getSearchCourses(searchTerm, tags, priceFrom, priceTo);
        setContextCourses(courses);
    }
    
    return (
        <>
            <h1>Products Page</h1>
            <Link href="/">Go back to Home</Link>

            <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <input type="text" placeholder="Tags ..." value={tags.join(", ")} onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))} />

            <input type="number" placeholder="Price from ..." value={priceFrom} onChange={(e) => setPriceFrom(e.target.value ? parseFloat(e.target.value) : undefined)} />
            <input type="number" placeholder="Price to ..." value={priceTo} onChange={(e) => setPriceTo(e.target.value ? parseFloat(e.target.value) : undefined)} />

            <button onClick={handleSearchClick}>Search</button>
        </>
    );
}