import { JSX } from "react/jsx-runtime";
import '@/app/globals.css';

export default function HeaderSub({hNumber, header, sub, ...props}: {hNumber: number, header: string, sub: string} & JSX.IntrinsicElements['div']) {
    const Tag = `h${hNumber}` as keyof JSX.IntrinsicElements;
    return (
        <div className="" {...props}>
            <Tag className="main-text">{header}</Tag>
            <p className="secondary-text">{sub}</p>
        </div>
    );
}