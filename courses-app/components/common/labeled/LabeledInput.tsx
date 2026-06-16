import '@/app/globals.css';
import { forwardRef } from 'react';
import Label from '../Label';
import Input from '../Input';

const LabeledInput = forwardRef<HTMLInputElement, { label: string; id: string; editable?: boolean } & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ label, id, editable = false, ...props }, ref) => {        
        return (
            <div className="main-margin flex flex-col">
                <Label htmlFor={id}>{label}</Label>
                <Input {...props} id={id} ref={ref} editable={editable} />
            </div>
        );
    }
);

LabeledInput.displayName = 'LabeledInput';

export default LabeledInput;