import Course from "@/types/Course";

export const courses = [
    new Course(1, "Learn Next.js", 49.99, "A comprehensive course on Next.js for beginners.", "/images/nextjs-course.jpg", ["nextjs", "react", "javascript"]),
    new Course(2, "Advanced Next.js", 79.99, "An advanced course on Next.js for experienced developers.", "/images/advanced-nextjs-course.jpg", ["nextjs", "react", "javascript"]),
    new Course(3, "React for Beginners", 39.99, "A beginner-friendly course on React.js.", "/images/react-course.jpg", ["react", "javascript"]),
    new Course(4, "Full-Stack Development", 99.99, "A complete course on full-stack web development.", "/images/fullstack-course.jpg", ["fullstack", "javascript", "react", "nextjs"]),
    new Course(5, "JavaScript Essentials", 29.99, "A course covering the fundamentals of JavaScript.", "/images/javascript-course.jpg", ["javascript"]),
    new Course(6, "TypeScript Mastery", 59.99, "A course on mastering TypeScript for modern web development.", "/images/typescript-course.jpg", ["typescript", "javascript"]),
    new Course(7, "Next.js API Routes", 44.99, "A course focused on building API routes with Next.js.", "/images/api-routes-course.jpg", ["nextjs", "api"]),
    new Course(8, "Next.js Performance Optimization", 54.99, "A course on optimizing performance in Next.js applications.", "/images/performance-course.jpg", ["nextjs", "performance"]),
];