export default function Label({ htmlFor, children, className }: { htmlFor: string, children: React.ReactNode, className?: string }) {
    return (
        <label htmlFor={htmlFor} className={`secondary-text ${className ?? ''}`}>{children}</label>
    );
}