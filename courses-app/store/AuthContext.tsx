'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { createAccount } from "@/lib/tables/account";

// context type definition
interface AuthContextType {
    user: any;
    session: any;
    isSignedIn: boolean;

    error: string | null;
    success: string | null;

    signIn: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;

    recoverPassword: (email: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
}

// create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// provider component
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    // state that will be available for context consumers
    const [user, setUser] = useState<any>(null);
    const [session, setSession] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    
    // async function to handle data
    async function fetchSession() {
        const sessionData = await supabase.auth.getSession();
        const session = sessionData.data.session;

        if (session) {
            setIsSignedIn(true);

            setSession(session);
            setUser(session.user);
        } else {
            setIsSignedIn(false);

            setSession(null);
            setUser(null);
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
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                setError(error.message);
                console.log("Error signing in:", error.message);
            } else {
                setError(null);
                setSuccess("Successfully signed in!");
                console.log("Successfully signed in");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during sign-in:", error);
        }
    };
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                setError(error.message);
                console.log("Error signing out:", error.message);
            } else {
                setError(null);
                setSuccess("Successfully signed out!");
                console.log("Successfully signed out");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during sign-out:", error);
        }
    };
    const register = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) {
                setError(error.message);
                console.log("Error registering:", error.message);
            } else {
                setError(null);
                setSuccess("Successfully registered!");
                console.log("Successfully registered");

                const userId = await supabase.auth.getUser().then(res => res.data.user?.id);
                createAccount(userId || '', '', '');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during registration:", error);
        }
    };
    const recoverPassword = async (email: string) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + "/reset-password"
            });
            if (error) {
                setError(error.message);
                console.log("Error recovering password:", error.message);
            } else {
                setError(null);
                setSuccess("Password recovery email sent!");
                console.log("Password recovery email sent");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during password recovery:", error);
        }
    };
    const loginWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
            if (error) {
                setError(error.message);
                console.log("Error logging in with Google:", error.message);
            } else {
                setError(null);
                setSuccess("Redirecting to Google for authentication...");
                console.log("Redirecting to Google for authentication");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during Google login:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, isSignedIn, error, success, signIn, register, signOut, recoverPassword, loginWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
}