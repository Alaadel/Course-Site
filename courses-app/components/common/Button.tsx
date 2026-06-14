import { JSX } from "react/jsx-runtime";
import '@/app/globals.css';

export default function Button({ children, color, ...props }: { children: React.ReactNode; color?: string } & JSX.IntrinsicElements['button']) {
    const style = "border border-gray-300 main-rounded \
                    p-2 \
                    " + (color ? color : "bg-white") + " \
                    hover:bg-gray-100 \
                    transition-colors duration-200" + (props.className ? " " + props.className : "");

    return (
        <button {...props} className={style}>
            {children}
        </button>
    );
}