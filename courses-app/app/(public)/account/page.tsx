'use client';

import '@/app/globals.css';

import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { AccountRow } from "@/lib/dbTypes";
import SectionCard from '@/components/common/containers/SectionCard';
import HeaderSub from '@/components/common/HeaderSub';
import LabeledInput from '@/components/common/labeled/LabeledInput';
import Button from '@/components/common/Button';
import { AccountPageContext, AccountPageContextProvider } from '@/store/AccountPageContext';
import { getAccountByAuthId, updateName } from '@/lib/tables/account';
import Modal from '@/components/common/containers/Modal';
import { supabase } from '@/lib/supabase-client';
import LinkStyled from '@/components/common/LinkStyled';

export default function Account() {
    // auth context based on supabase auth. provided to all pages
    const authCtx = useContext(AuthContext);
    // account page context to manage the state of the account page
    const accountPageCtx = useContext(AccountPageContext);

    // shortcuts
    const userId = authCtx?.user?.id;
    let isEditing = accountPageCtx?.state === 'editing';
    let isResettingPassword = accountPageCtx?.state === 'resettingPassword';

    // state to store the current account
    const [account, setAccount] = useState<AccountRow | null>(null);

    // refs for input fields
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    // async method to fetch account details from the database
    async function fetchAccountDetails(): Promise<AccountRow | null> {
        if (!userId) {
            console.log("User ID is not available. Cannot fetch account details.");
            return null;
        }

        try {
            const account = await getAccountByAuthId(userId || '');
            console.log(`Fetched account details for id ${userId}:`, account);
            return account;
        } catch (error) {
            console.error("Error fetching account details:", error);
            return null;
        }
    }

    // use effect to call the async method to fetch account details
    useEffect(() => {
        fetchAccountDetails().then((account) => {
            if (account) {
                setAccount(account);
            }
        });
    }, [userId]);
    // use effect to subscribe to table updates and refresh account details
    useEffect(() => {
        const channel = supabase.channel("account_channel");
        if (!userId) return;

        // must have Real Time enabled on the supabase table for this to work
        channel.on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "account", filter: `id=eq.${userId}` },
            (payload) => {
                console.log("Received account update:", payload);
                const accountData = payload.new as AccountRow;
                setAccount(accountData);
            }).subscribe((status) => {
                console.log("account_channel subscription status:", status);
            });

        // cleanup function to unsubscribe from the channel when the component unmounts or userId changes
        return () => {
            console.log("Unsubscribing from account_channel");
            supabase.removeChannel(channel);
        };
    }, [userId]);

    function handleEditAccount() {
        console.log("handleEditAccount");
        accountPageCtx?.resetMessage();
        accountPageCtx?.setState('editing');
    }
    async function handleSaveAccount() {
        console.log("handleSaveAccount");

        try {
            const updatedAccount = await updateName(userId, firstNameRef.current?.value || '', lastNameRef.current?.value || '');
            accountPageCtx?.setState('normal');
        } catch (error) {
            console.error("Error updating account:", error);
            accountPageCtx?.setMessage("Error updating account. Please try again.");
        }
    }
    function handleCancelEdit() {
        console.log("handleCancelEdit");
        // Implement cancel edit logic here, e.g., reset form fields to original account details
        accountPageCtx?.resetMessage();
        accountPageCtx?.setState('normal');
    }
    function handleSignOut() {
        console.log("handleSignOut");
        if (!authCtx) return;
        authCtx.signOut();
    }

    function handleResetPassword() {
        console.log("handleResetPassword");
        accountPageCtx?.resetMessage();
        accountPageCtx?.setState('resettingPassword');
    }
    function handleCancelReset() {
        console.log("handleCancelReset");
        accountPageCtx?.resetMessage();
        accountPageCtx?.setState('normal');
    }

    return (
        <AccountPageContextProvider>
            {!authCtx?.isLoggedIn ? (
                <p className="text-center main-text main-margin">Please <LinkStyled href="/login">login</LinkStyled> to view your account details.</p>
            ) : (
                <>
                    <HeaderSub className="main-margin" hNumber={1} header="My Account" sub="Manage your profile and account settings." />

                    <SectionCard>
                        {/* push the button to the far right*/}
                        <div className="main-margin flex items-center justify-between">
                            <HeaderSub hNumber={2} header="Profile" sub="Basic account information." />
                            <Button onClick={handleEditAccount}>Edit</Button>
                        </div>

                        <LabeledInput label="Email" value={authCtx?.user?.email || ''} onChange={() => { }} disabled />
                        <LabeledInput label="First Name" value={account?.first_name || ''} onChange={() => { }} disabled />
                        <LabeledInput label="Last Name" value={account?.last_name || ''} onChange={() => { }} disabled />

                        <div className="main-margin flex items-center justify-between my-2">
                            <Button onClick={handleResetPassword}>Reset Password</Button>
                            <Button color="bg-red" className="text-white" onClick={handleSignOut}>Log out</Button>
                        </div>


                        {/* Reset Password modal */}
                        <Modal open={isResettingPassword} onClose={handleCancelReset}>
                            <HeaderSub hNumber={3} header="Reset Password"
                                sub={accountPageCtx?.message ? accountPageCtx.message : ""} />
                            <div className="grid grid-cols-1 gap-4">
                                <LabeledInput label="New Password" editable={true} type="password" ref={firstNameRef} defaultValue={account?.first_name || ''} />
                                <LabeledInput label="Confirm Password" editable={true} type="password" ref={lastNameRef} defaultValue={account?.last_name || ''} />

                                <div className="flex justify-between gap-2">
                                    <Button color="bg-red" className="main-margin text-white" onClick={handleResetPassword}>Reset</Button>
                                    <Button className="main-margin" onClick={handleCancelReset}>Cancel</Button>
                                </div>
                            </div>
                        </Modal>


                        {/* Edit modal */}
                        <Modal open={isEditing} onClose={handleCancelEdit}>
                            <HeaderSub hNumber={3} header="Edit Name"
                                sub={accountPageCtx?.message ? accountPageCtx.message : ""} />
                            <div className="grid grid-cols-1 gap-4">
                                <LabeledInput label="First Name" editable={true} type="text" ref={firstNameRef} defaultValue={account?.first_name || ''} />
                                <LabeledInput label="Last Name" editable={true} type="text" ref={lastNameRef} defaultValue={account?.last_name || ''} />

                                <div className="flex justify-between gap-2">
                                    <Button className="main-margin" onClick={handleSaveAccount}>Save</Button>
                                    <Button className="main-margin" onClick={handleCancelEdit}>Cancel</Button>
                                </div>
                            </div>
                        </Modal>

                    </SectionCard>
                </>
            )}
        </AccountPageContextProvider>
    );
}