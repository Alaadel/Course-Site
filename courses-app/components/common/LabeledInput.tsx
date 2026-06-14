import '@/app/globals.css';
import { forwardRef } from 'react';

const LabeledInput = forwardRef<HTMLInputElement, { label: string; editable?: boolean } & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ label, editable = false, ...props }, ref) => {
        let style = "py-1 w-full ";
        if (editable) {
            style += "border border-gray-300 rounded px-2";
        } else {
            style += "bg-white";
        }
        
        return (
            <div className="main-margin flex flex-col">
                <label className="secondary-text">{label}</label>
                <input {...props} ref={ref} className={style}/>
            </div>
        );
    }
);

LabeledInput.displayName = 'LabeledInput';

export default LabeledInput;