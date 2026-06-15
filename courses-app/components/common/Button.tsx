import { JSX } from "react/jsx-runtime";
import '@/app/globals.css';

export default function Button({ children, color, ...props }: { children: React.ReactNode; color?: string } & JSX.IntrinsicElements['button']) {
    const style = "main-rounded p-2 transition-colors duration-200" 
                    + (color ? color : " black-button")
                    + (props.className ? " " + props.className : "");

    return (
        <button {...props} className={style}>
            {children}
        </button>
    );
}