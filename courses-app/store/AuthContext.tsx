'use client';

import { createContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { accountExists, createAccount } from "@/lib/tables/account";
import { isAdmin } from "@/lib/tables/account";
import { useRouter } from "next/navigation";
import { AuthChangeEvent, Session } from "@supabase/auth-js/dist/module/lib/types";

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
    async function checkNewAccount(event: AuthChangeEvent, session: Session | null) {
        try {
            // normal register already calls createAccount,
            // oauth login has to create an account and associate it with the oauth user
            // TODO: this could be moved to a supabase function that is called when a user is added to auth table
            if (event === "SIGNED_IN" && session?.user) {
                // Could be OAuth or email sign-in
                const provider = session.user.app_metadata?.provider;
                console.log("Sign-in event, provider:", provider);

                if (provider !== "email") { //== "google") {
                    // OAuth - could be first-time or returning user
                    // Check if account exists in database
                    const user = session.user;
                    const userId = user.id;
                    const existingAccount = await accountExists(userId);

                    if (!existingAccount) {
                        // First-time OAuth user - create account
                        console.log("New OAuth user, creating account");
                        const displayName = user.user_metadata?.full_name || "User";
                        await createAccount(userId, displayName, '');
                    } else {
                        // Returning OAuth user
                        console.log("Returning OAuth user");
                    }
                }
            }
        } catch (error) {
            console.error("Error handling auth state change:", error);
        }
    }

    // sync function to handle data + cleanup
    useEffect(() => {
        // get data
        fetchSession();

        // listen for updates
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoggedIn(!!session);

            await checkNewAccount(event, session);
        });

        // cleanup = return a function that unsubscribes
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []); // no dependencies, so this runs once on mount and sets up the listener. (using dependencies will run it every time the dependencies change)
    
    // instead of checking admin state inside other useEffects
    // (where the state is still not-committed and the context value is stale),
    // use a dedicated useEffect that listens to changes in the user state, 
    // so that it always has the latest user data and updates the admin state accordingly
    useEffect(() => {
        if (user?.id) {
            isAdmin(user.id).then((isAdminRole) => {
                setIsAdmin(isAdminRole);
            });
        } else {
            setIsAdmin(false);
        }
    }, [user]);

    const updateAdminState = async () => {
        const userId = contextSnapshot.getUserId();
        console.log(`Updating admin state for user ID: ${userId}`);

        if (userId) {
            const isAdminRole = await isAdmin(userId);
            console.log(`User ${userId} admin role: ${isAdminRole}`);
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
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: window.location.origin // User returns here after Google auth
                }
            });

            if (error) {
                setError(error.message);
                console.log("Error logging in with Google:", error.message);
            } else {
                // Just redirect to the OAuth URL - don't try to get user yet
                window.location.href = data.url;
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error));
            console.log("Unexpected error during Google login:", error);
        }
    };
    // const loginWithGoogle = async () => {
    //     console.log("auth context loginWithGoogle");

    //     try {
    //         const { data, error } = await supabase.auth.signInWithOAuth({ provider: "google" });

    //         if (error) {
    //             setError(error.message);
    //             console.log("Error logging in with Google:", error.message);
    //         } else {
    //             console.log("Google login successful, data:", data);
    //             const user = await supabase.auth.getUser()
    //             console.log("Google login successful, user data:", user);
    //             const userId = user.data.user?.id;
    //             console.log(`Google login successful, user ID: ${userId}`);
    //             const displayName = user.data.user?.user_metadata.full_name || "Google User";
    //             console.log(`Google login successful, display name: ${displayName}`);

    //             await createAccount(userId || '', displayName, '');  // create account with display name as first name and empty last name

    //             await updateAdminState();

    //             setError(undefined);
    //             setSuccess("Redirecting to Google for authentication...");
    //             console.log("Redirecting to Google for authentication");

    //             navigateToHome();
    //         }
    //     } catch (error) {
    //         setError(error instanceof Error ? error.message : String(error));
    //         console.log("Unexpected error during Google login:", error);
    //     }
    // };
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
            return user?.id || session?.user?.id || null;
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