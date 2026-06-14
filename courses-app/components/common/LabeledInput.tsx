import '@/app/globals.css';

export default function LabeledInput({ label, editable = false, ...props }: { label: string; editable?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
    let style = "py-1 w-full ";
    if (editable) {
        style += "border border-gray-300 rounded px-2";
    } else {
        style += "bg-white";
    }
    
    return (
        <div className="main-margin flex flex-col">
            <label className="secondary-text">{label}</label>
            <input {...props} className={style}/>
        </div>
    );
}