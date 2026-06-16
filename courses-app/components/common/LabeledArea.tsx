import '@/app/globals.css';
import { forwardRef } from 'react';

const LabeledArea = forwardRef<HTMLTextAreaElement, { label: string; id: string; } & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ label, id, ...props }, ref) => {
        let style = "py-1 w-full border border-gray-300 rounded px-2";

        return (
            <div className="main-margin flex flex-col">
                <label htmlFor={id} className="secondary-text">{label}</label>
                <textarea {...props} id={id} ref={ref} className={style} />
            </div>
        );
    }
);

LabeledArea.displayName = 'LabeledArea';

export default LabeledArea;