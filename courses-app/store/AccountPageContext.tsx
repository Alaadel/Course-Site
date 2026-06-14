'use client';

import { createContext, useState } from "react";

type AccountPageState = 'normal' | 'editing' | 'resettingPassword';

interface AccountPageContextType {
    state: AccountPageState;
    setState: React.Dispatch<React.SetStateAction<AccountPageState>>;

    message?: string;
    setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
    resetMessage: () => void;
}

export const AccountPageContext = createContext<AccountPageContextType | undefined>(undefined);

export function AccountPageContextProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AccountPageState>('normal');
    const [message, setMessage] = useState<string | undefined>(undefined);

    const contextValue: AccountPageContextType = {
        state,
        setState,
        message,
        setMessage,
        resetMessage: () => setMessage(undefined),
    };

    return (
        <AccountPageContext.Provider value={contextValue}>
            {children}
        </AccountPageContext.Provider>
    );
}