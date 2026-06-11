import { supabase } from "@/lib/supabase-client";

import { Account_ } from "@/types/Account";

export async function createAccount(authId: number, email: string, firstName: string, lastName?: string): Promise<void> {
    const { data, error } = await supabase
        .from('accounts')
        .insert({ id: authId, first_name: firstName, last_name: lastName })
    // .select()   // return the inserted row
    // .single();  // we expect only one row to be inserted, so do not return an array

    if (error) {
        throw new Error(`Error creating account: ${error.message}`);
    }

    // return data as Account_;
}

export async function getAccountByAuthId(authId: number): Promise<Account_ | null> {
    const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('id', authId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') { // No rows found
            return null;
        }
        throw new Error(`Error fetching account: ${error.message}`);
    }

    return data as Account_;
}

export async function updateAccount(account: Account_): Promise<void> {
    const { data, error } = await supabase
        .from('accounts')
        .update({ first_name: account.firstName, last_name: account.lastName })
        .eq('id', account.authId);

    if (error) {
        throw new Error(`Error updating account: ${error.message}`);
    }
}

export async function resetPassword(newPassword: string): Promise<void> {
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