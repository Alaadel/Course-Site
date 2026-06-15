import "@/app/globals.css";

type FeedbackMessageState = "error" | "success" | null;

export default function FeedbackMessage({ state, message }: { state: FeedbackMessageState, message?: string }) {
    return (
        <div>
            {state === "error" && <p className="bg-red">{message}</p>}
            {state === "success" && <p className="bg-green">{message}</p>}
        </div>
    )
}