'use client';

import { createContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { createAccount } from "@/lib/tables/account";
import { isAdmin } from "@/lib/tables/account";
import { useRouter } from "next/navigation";

// context type definition
interface AuthContextType {
    user: any;
    session: any;
    isLoggedIn: boolean;
    isAdmin: boolean;

    error: string | undefined;
    success: string | undefined;

    getUserId(): string | null;

    signIn: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    signOut: () => Promise<void>;

    recoverPassword: (email: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;

    resetFeedback: () => void;
}

// create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// provider component
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    // router
    const router = useRouter();

    // state that will be available for context consumers
    const [user, setUser] = useState<any>(null);
    const [session, setSession] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [is_admin, setIsAdmin] = useState(false);

    // async function to handle data
    async function fetchSession() {
        const sessionData = await supabase.auth.getSession();
        const session = sessionData.data.session;

        if (session) {
            setIsLoggedIn(true);

            setSession(session);
            setUser(session.user);
        } else {
            setIsLoggedIn(false);

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
            setIsLoggedIn(!!session);
        });

        // cleanup = return a function that unsubscribes
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []); // no dependencies, so this runs once on mount and sets up the listener. (using dependencies will run it every time the dependencies change)


    const updateAdminState = async () => {
        const userId = contextSnapshot.getUserId();
        if (userId) {
            const isAdminRole = await isAdmin(userId);
            setIsAdmin(isAdminRole);
        } else {
            setIsAdmin(false);
        }
    };
    const navigateToHome = () => {
        router.push("/");   // redirect to home page after success
    }

    // log-in/out callbacks to be provided to consumers so they can use them
    // they are added here because their results change the auth state
    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        console.log("auth context register");

        try {
            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                setError(error.message);
                console.log("Error registering:", error.message);
            } else {
                await createAccount(data.user?.id || '', firstName, lastName);

                await updateAdminState();

                setError(undefined);
                setSuccess("Successfully registered!");
                console.log("Successfully registered");

                navigateToHome();
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during registration:", error);
        }
    };
    const recoverPassword = async (email: string) => {
        console.log("auth context recoverPassword");

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + "/reset-password"
            });

            if (error) {
                setError(error.message);
                console.log("Error recovering password:", error.message);
            } else {
                setError(undefined);
                setSuccess("Password recovery email sent!");
                console.log("Password recovery email sent");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during password recovery:", error);
        }
    };
    const login = async (email: string, password: string) => {
        console.log("auth context login");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                setError(error.message);
                console.log("Error signing in:", error.message);
            } else {
                await updateAdminState();

                setError(undefined);
                setSuccess("Successfully signed in!");
                console.log("Successfully signed in");

                navigateToHome();
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during sign-in:", error);
        }
    };
    const loginWithGoogle = async () => {
        console.log("auth context loginWithGoogle");

        try {
            const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
            if (error) {
                setError(error.message);
                console.log("Error logging in with Google:", error.message);
            } else {
                setError(undefined);
                setSuccess("Redirecting to Google for authentication...");
                console.log("Redirecting to Google for authentication");

                navigateToHome();
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during Google login:", error);
        }
    };
    const logout = async () => {
        console.log("auth context logout");

        try {
            const { error } = await supabase.auth.signOut();
            await updateAdminState();   // reset admin state, regardless of logout success

            if (error) {
                setError(error.message);
                console.log("Error signing out:", error.message);
            } else {
                setError(undefined);
                setSuccess("Successfully signed out!");
                console.log("Successfully signed out");

                navigateToHome();
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during sign-out:", error);
        }
    };
    
    const contextSnapshot: AuthContextType = {
        user, session, isLoggedIn, isAdmin: is_admin, error, success,

        getUserId() {
            return user?.id || null;
        },

        signIn: login,
        register: register,
        signOut: logout,

        recoverPassword: recoverPassword,
        loginWithGoogle: loginWithGoogle,

        resetFeedback: () => {
            setError(undefined);
            setSuccess(undefined);
        }
    };

    return (
        <AuthContext.Provider value={contextSnapshot}>
            {children}
        </AuthContext.Provider>
    );
}