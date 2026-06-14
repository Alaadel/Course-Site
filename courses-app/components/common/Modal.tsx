import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/*
    1- add a div with id="modal" in the root layout, so that the modal can be injected into it.
    2- use the 'open' prop to control the visibility of the modal.
*/

export default function Modal({ children, open, onClose, className = '' }: { children: React.ReactNode; open: boolean; onClose?: () => void; className?: string }) {
    let style = `modal ${className}`;
    
    // giving access to dialog element so it can be controlled programmatically
    const dialog = useRef<HTMLDialogElement>(null);
    
    // can use 'open' directly on dialog, but it will lose the automatic dim shadow. 
    // So using useEffect instead to control it programmatically
    useEffect(() => {
        // storing this ref because, due to react's scheduling, there could be delay between when the effect runs and when clean up runs, and during that the dialog.current could change.
        // so caching the specific modal we are controlling here so it is always correct.
        const modal = dialog.current;

        if (open) {
            modal?.showModal();
        }

        // clean up function, which is run every time the effect runs, which is when the 'open' prop changes. 
        // so using cleanup to close the dialog when the 'open' prop changes to false, or when the component unmounts.
        return () => {
            modal?.close();
        }
    }, [open]);

    // using portal to allow injecting the modal into an element with id="modal" (or body, if not found)
    return createPortal(
        <dialog ref={dialog} className={style} onClose={onClose}>
            {children}
        </dialog>
    , document.getElementById('modal') || document.body);
}