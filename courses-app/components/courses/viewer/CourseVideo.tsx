export default function CourseVideo({ url }: { url: string | undefined }) {
    return (
        <>
            <h2>Course Video</h2>
            {url ? (
                <video src={url} controls />
            ) : (
                <p>This is where the course video will be displayed.</p>
            )}
        </>
    );
}