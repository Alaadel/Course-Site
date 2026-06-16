import '@/app/globals.css';
import { forwardRef } from 'react';
import TextArea from '../TextArea';
import Label from '../Label';

const LabeledArea = forwardRef<HTMLTextAreaElement, { label: string; id: string; } & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ label, id, ...props }, ref) => {
        return (
            <div className="main-margin flex flex-col">
                <Label htmlFor={id}>{label}</Label>
                <TextArea {...props} id={id} ref={ref} />
            </div>
        );
    }
);

LabeledArea.displayName = 'LabeledArea';

export default LabeledArea;