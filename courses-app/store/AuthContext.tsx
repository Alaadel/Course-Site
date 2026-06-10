'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";

// context type definition
interface AuthContextType {
    user: any;
    session: any;
    isSignedIn: boolean;

    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

// create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// provider component
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    // state that will be available for context consumers
    const [user, setUser] = useState<any>(null);
    const [session, setSession] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState(false);

    // async function to handle data
    async function fetchSession() {
        const sessionData = await supabase.auth.getSession();
        const session = sessionData.data.session;

        if (session) {
            setSession(session);
            setUser(session.user);
            setIsSignedIn(true);
        } else {
            setSession(null);
            setUser(null);
            setIsSignedIn(false);
        }
    }

    // sync function to handle data + cleanup
    useEffect(() => {
        // get data
        fetchSession();

        // listen for updates
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsSignedIn(!!session);
        });

        // cleanup = return a function that unsubscribes
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []); // no dependencies, so this runs once on mount and sets up the listener. (using dependencies will run it every time the dependencies change)

    // sign-in/out callbacks to be provided to consumers so they can use them
    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.log("Error signing in:", error.message);
            // throw error;
        }
    };
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error signing out:", error.message);
            // throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, isSignedIn, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}