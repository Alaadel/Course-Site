import Course from "@/data/Course";

export function getCourses(): Course[] {
    const courses = [
        new Course(1, "Learn Next.js", 49.99, "A comprehensive course on Next.js for beginners.", "/images/nextjs-course.jpg"),
        new Course(2, "Advanced Next.js", 79.99, "An advanced course on Next.js for experienced developers.", "/images/advanced-nextjs-course.jpg"),
        new Course(3, "React for Beginners", 39.99, "A beginner-friendly course on React.js.", "/images/react-course.jpg"),
        new Course(4, "Full-Stack Development", 99.99, "A complete course on full-stack web development.", "/images/fullstack-course.jpg"),
        new Course(5, "JavaScript Essentials", 29.99, "A course covering the fundamentals of JavaScript.", "/images/javascript-course.jpg"),
        new Course(6, "TypeScript Mastery", 59.99, "A course on mastering TypeScript for modern web development.", "/images/typescript-course.jpg"),
        new Course(7, "Next.js API Routes", 44.99, "A course focused on building API routes with Next.js.", "/images/api-routes-course.jpg"),
        new Course(8, "Next.js Performance Optimization", 54.99, "A course on optimizing performance in Next.js applications.", "/images/performance-course.jpg"),
    ];
    return courses;
}