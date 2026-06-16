import '@/app/globals.css';
import { forwardRef } from 'react';

const LabeledSelect = forwardRef<HTMLSelectElement | HTMLInputElement, { 
    label: string; 
    options: string[]; 
    allowCustom?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>>(
    ({ label, id, options, allowCustom = false, ...props }, ref) => {
        if (allowCustom) {
            return (
                <div className="main-margin flex flex-col">
                    <label htmlFor={id} className="secondary-text">{label}</label>
                    <input list={`datalist-${id}`} id={id} ref={ref as React.Ref<HTMLInputElement>} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} className="py-1 w-full border border-gray-300 rounded px-2" />
                    <datalist id={`datalist-${id}`}>
                        {options.map((option, index) => (
                            <option key={index} value={option} />
                        ))}
                    </datalist>
                </div>
            );
        }

        return (
            <div className="main-margin flex flex-col">
                <label htmlFor={id} className="secondary-text">{label}</label>
                <select {...props} id={id} ref={ref as React.Ref<HTMLSelectElement>} className="py-1 w-full border border-gray-300 rounded px-2">
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        );
    }
);

LabeledSelect.displayName = 'LabeledSelect';

export default LabeledSelect;