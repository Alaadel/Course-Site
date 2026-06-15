import "@/app/globals.css";

type FeedbackMessageState = "error" | "success" | null;

export default function FeedbackMessage({ state, message }: { state: FeedbackMessageState, message?: string }) {
    return (
        <div className="flex justify-center main-margin">
            {state === "error" && <p className="text-red">{message}</p>}
            {state === "success" && <p className="text-green">{message}</p>}
        </div>
    )
}