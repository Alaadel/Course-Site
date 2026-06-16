import { forwardRef } from "react";

const TextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className = '', ...props }, ref) => {
    let style = "py-1 w-full border border-gray-300 rounded px-2 " + className;

    return (
        <div className="main-margin flex flex-col">
            <textarea {...props} className={style} ref={ref} />
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;