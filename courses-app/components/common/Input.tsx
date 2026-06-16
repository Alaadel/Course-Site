import { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, { id: string; editable?: boolean } & React.InputHTMLAttributes<HTMLInputElement>>(
    ({ id, editable = false, ...props }, ref) => {
        let style = "py-1 w-full ";
        if (editable) {
            style += "border border-gray-300 rounded px-2";
        } else {
            style += "bg-white";
        }

        return (
            <div className="main-margin flex flex-col">
                <input {...props} id={id} ref={ref} className={style}/>
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
