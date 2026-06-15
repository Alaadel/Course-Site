import { supabase } from "@/lib/supabase-client";

import { AccountRow } from "@/lib/dbTypes";
import { sanitizeInput } from "@/lib/sanitize";

export async function isAdmin(authId: string): Promise<boolean> {
    [authId] = sanitizeInput(authId);

    const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // No rows found
            return false; // user has no role, so not admin
        }
        throw new Error(`Error checking admin role: ${error.message}`);
    }

    return data.role === 'admin';
}

export async function createAccount(authId: string, firstName: string, lastName?: string): Promise<void> {
    [authId,firstName,lastName] = sanitizeInput(authId, firstName, lastName || "");

    const { data, error } = await supabase
        .from('account')
        .insert({ id: authId, first_name: firstName, last_name: lastName })
    // .select()   // return the inserted row
    // .single();  // we expect only one row to be inserted, so do not return an array
    
    if (error) {
        throw new Error(`Error creating account: ${error.message}`);
    }

    // return data as Account_;
}

export async function getAccountByAuthId(authId: string): Promise<AccountRow | null> {
    [authId] = sanitizeInput(authId);

    const { data, error } = await supabase
        .from('account')
        .select('*')
        .eq('id', authId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // No rows found
            return null;
        }
        throw new Error(`Error fetching account: ${error.message}`);
    }

    return data as AccountRow;
}

export async function updateName(authId: string, firstName: string, lastName: string): Promise<void> {
    [authId, firstName, lastName] = sanitizeInput(authId, firstName, lastName);

    const { data, error } = await supabase
        .from('account')
        .update({ first_name: firstName, last_name: lastName })
        .eq('id', authId);

    if (error) {
        throw new Error(`Error updating account: ${error.message}`);
    }
}

export async function resetPassword(newPassword: string): Promise<void> {
    [newPassword] = sanitizeInput(newPassword);
    
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
        throw new Error(`Error resetting password: ${error.message}`);
    }

    console.log("Password reset successful.");
}

export async function logOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(`Error logging out: ${error.message}`);
    }

    console.log("Logged out successfully.");
}