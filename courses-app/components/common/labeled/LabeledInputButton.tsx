import '@/app/globals.css';
import { forwardRef } from 'react';
import Button from '../Button';
import Label from '../Label';
import Input from '../Input';

// onClick tells the caller when the button is clicked
// then the caller checks the ref to get the value of the input field

const LabeledInputButton = forwardRef<HTMLInputElement, { label: string; id: string; btnLabel: string; editable?: boolean; onClick?: () => void } & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ label, id, btnLabel: btnText, editable = false, onClick, ...props }, ref) => {
        return (
            <div className="main-margin flex flex-col">
                <Label htmlFor={id}>{label}</Label>
                
                <div>
                    <Input {...props} id={id} ref={ref} editable={editable} />
                    
                    <Button onClick={() => {
                        if (ref && 'current' in ref && ref.current) {
                            onClick?.();
                        }
                    }} className="ml-2">{btnText}</Button>
                </div>
            </div>
        );
    }
);

LabeledInputButton.displayName = 'LabeledInputButton';

export default LabeledInputButton;