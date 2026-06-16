import '@/app/globals.css';
import { forwardRef } from 'react';
import Label from '../Label';
import Input from '../Input';

const LabeledSelect = forwardRef<HTMLSelectElement | HTMLInputElement, { 
    label: string; 
    id: string;
    options: string[]; 
    allowCustom?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>>(
    ({ label, id, options, allowCustom = false, ...props }, ref) => {
        if (allowCustom) {
            return (
                <div className="main-margin flex flex-col">
                    <Label htmlFor={id}>{label}</Label>
                    <Input list={`datalist-${id}`} id={id} ref={ref as React.Ref<HTMLInputElement>} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
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
                <Label htmlFor={id}>{label}</Label>
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