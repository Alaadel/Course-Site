'use client';

import '@/app/globals.css';

import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import ResetPasswordModal from "@/components/account/ResetPasswordModal";
import { AccountRow } from "@/lib/dbTypes";
import SectionCard from '@/components/common/SectionCard';
import HeaderSub from '@/components/common/HeaderSub';
import LabeledInput from '@/components/common/LabeledInput';
import Button from '@/components/common/Button';
import { AccountPageContext, AccountPageContextProvider } from '@/store/AccountPageContext';
import { getAccountByAuthId } from '@/lib/tables/account';
import Modal from '@/components/common/Modal';

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
        const account = await getAccountByAuthId(userId || '');
        console.log(`Fetched account details for id ${userId}:`, account);
        return account;
    }

    // use effect to call the async method to fetch account details
    useEffect(() => {
        fetchAccountDetails().then((account) => {
            if (account) {
                setAccount(account);
            }
        });
    }, [userId]);

    function handleEditAccount() {
        console.log("handleEditAccount");
        // Implement account editing logic here, e.g., show a form to edit account details
        accountPageCtx?.setState('editing');
    }
    function handleSaveAccount() {
        console.log("handleSaveAccount");
        // Implement account saving logic here, e.g., send updated account details to the server
        const updatedAccount = {
            ...account,
            first_name: firstNameRef.current?.value,
            last_name: lastNameRef.current?.value,
        };
        console.log("Updated account details:", updatedAccount);
        // setAccount(updatedAccount);
        accountPageCtx?.setState('normal');
    }
    function handleCancelEdit() {
        console.log("handleCancelEdit");
        // Implement cancel edit logic here, e.g., reset form fields to original account details
        accountPageCtx?.setState('normal');
    }
    function handleSignOut() {
        console.log("handleSignOut");
        if (!authCtx) return;
        authCtx.signOut();
    }
    function handleResetPassword() {
        console.log("handleResetPassword");
        // Implement password reset logic here, e.g., show a form to enter new password
        accountPageCtx?.setState('resettingPassword');
    }

    return (
        <AccountPageContextProvider>
            {authCtx?.isSignedIn ? (
                <section>
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
                            <Button color="bg-red-300" className="text-white" onClick={handleSignOut}>Log out</Button>
                        </div>

                        {isResettingPassword && (
                            <ResetPasswordModal onCancel={() => accountPageCtx?.setState('normal')} />
                        )}

                        // Edit modal
                        <Modal open={isEditing} onClose={handleCancelEdit}>
                            <input type="text" ref={firstNameRef} defaultValue={account?.first_name || ''} placeholder="First Name" />
                            <input type="text" ref={lastNameRef} defaultValue={account?.last_name || ''} placeholder="Last Name" />
                            <Button onClick={handleSaveAccount}>Save</Button>
                            <Button onClick={handleCancelEdit}>Cancel</Button>
                        </Modal>

                    </SectionCard>
                </section>
            ) : (
                <p className="text-center main-text">Please <Link href="/login">login</Link> to view your account details.</p>
            )}
        </AccountPageContextProvider>
    );
}