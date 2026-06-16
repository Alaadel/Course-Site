import "@/app/globals.css";

export type FeedbackMessageState = "error" | "success" | null;
export type Feedback = {
    type: FeedbackMessageState;
    message: string;
}

export default function FeedbackMessage({ feedback }: { feedback: Feedback | null }) {
    if (!feedback) return null;
    const { type, message } = feedback;

    return (
        <div className="flex justify-center main-margin">
            {type === "error" && <p className="text-red">{message}</p>}
            {type === "success" && <p className="text-green">{message}</p>}
        </div>
    )
}