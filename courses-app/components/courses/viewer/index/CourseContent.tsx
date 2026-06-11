export default function CourseContent({ content }: { content: string | undefined }) {
    return (
        <>
            <h2>Course Content</h2>
            <p>{content}</p>
        </>
    );
}