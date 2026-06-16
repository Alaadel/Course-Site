import '@/app/globals.css';

export default function SectionCard({children}: {children: React.ReactNode}) {
    return (
        <div className="bg-white border-2 border-gray-100 main-rounded p-2 m-8">
            {children}
        </div>
    );
}