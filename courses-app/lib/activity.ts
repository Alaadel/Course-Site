import { supabase } from "@/lib/supabase-client";

export type ActivitySchema = {
    id: number;
    created_at: string;
    account_id: number;
    type: string;
    data: string;
}

const default_window = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

const clampWindow = (from: string, to: string): [string, string] => {
    if (!from) {
        from = new Date(Date.now() - default_window).toISOString();
    }
    if (!to) {
        to = new Date().toISOString();
    }

    return [from, to];
}

export async function logActivity(accountId: number, type: string, data: string): Promise<void> {
    const { data: activityData, error } = await supabase
        .from('activities')
        .insert({ account_id: accountId, type, data });
        
    if (error) {
        throw new Error(`Error logging activity: ${error.message}`);
    }

    console.log(`Activity logged for account ${accountId}: ${type}`);
}

// All functions should use time windows to limit the amount of data fetched

export async function getActivityByTime(accountId: number, from: string, to: string): Promise<ActivitySchema[]> {
    [from, to] = clampWindow(from, to);

    const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('account_id', accountId)
        .gte('created_at', from)
        .lte('created_at', to)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error fetching activities: ${error.message}`);
    }

    return data;
}
export async function getActivitiesByAccountId(accountId: number, from: string, to: string): Promise<ActivitySchema[]> {
    [from, to] = clampWindow(from, to);

    const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('account_id', accountId)
        .gte('created_at', from)
        .lte('created_at', to)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error fetching activities: ${error.message}`);
    }

    return data;
}
