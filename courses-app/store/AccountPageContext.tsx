'use client';

import { createContext, useState } from "react";

type AccountPageState = 'normal' | 'editing' | 'resettingPassword';

interface AccountPageContextType {
    state: AccountPageState;
    setState: React.Dispatch<React.SetStateAction<AccountPageState>>;
}

export const AccountPageContext = createContext<AccountPageContextType | undefined>(undefined);

export function AccountPageContextProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AccountPageState>('normal');
    
    const contextValue: AccountPageContextType = {
        state,
        setState,
    };

    return (
        <AccountPageContext.Provider value={contextValue}>
            {children}
        </AccountPageContext.Provider>
    );
}