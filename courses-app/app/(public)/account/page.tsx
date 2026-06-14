'use client';

import { AuthContext } from "@/store/AuthContext";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import ResetPasswordModal from "@/components/account/ResetPasswordModal";
import { AccountRow } from "@/lib/dbTypes";

export default function Account() {
    const context = useContext(AuthContext);
    const userId = context?.user?.id;

    const [account, setAccount] = useState<AccountRow | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    async function fetchAccountDetails(): Promise<AccountRow | undefined> {
        if (!userId) return undefined;
        // Fetch account details using userId
        // You can use context.accountId if you have it set up in your AuthContext
        return undefined; // Replace with actual account details fetching logic
    }

    useEffect(() => {
        fetchAccountDetails().then((account) => {
            if (account) {
                setAccount(account);
            }
        });
    }, [userId]);

    function handleEditAccount() {
        // Implement account editing logic here, e.g., show a form to edit account details
        setIsEditing(true);
    }
    function handleSaveAccount() {
        // Implement account saving logic here, e.g., send updated account details to the server
        const updatedAccount = {
            ...account,
            firstName: firstNameRef.current?.value,
            lastName: lastNameRef.current?.value,
        };
        // setAccount(updatedAccount);
        setIsEditing(false);
    }
    function handleCancelEdit() {
        // Implement cancel edit logic here, e.g., reset form fields to original account details
        setIsEditing(false);
    }
    function handleSignOut() {
        if (!context) return;
        context.signOut();
    }
    function handleResetPassword() {
        // Implement password reset logic here, e.g., show a form to enter new password
        setIsResettingPassword(true);
    }

    const editingContent = (
        <div>
            {/* <input type="text" placeholder="Email" defaultValue={account?.email} /> */}
            <input type="text" placeholder="First Name" defaultValue={account?.first_name} ref={firstNameRef} />
            <input type="text" placeholder="Last Name" defaultValue={account?.last_name} ref={lastNameRef} />

            <button onClick={handleCancelEdit}>Cancel</button>
            <button onClick={handleSaveAccount}>Save</button>
        </div>
    );
    const viewingContent = (
        <div>
            <p>Email: {context?.user?.email}</p>
            <p>First Name: {account?.first_name}</p>
            <p>Last Name: {account?.last_name}</p>

            <button onClick={handleEditAccount}>Edit Account</button>
            <button onClick={handleSignOut}>Sign Out</button>
            <button onClick={handleResetPassword}>Reset Password</button>

            {isResettingPassword && (
                <ResetPasswordModal onCancel={() => setIsResettingPassword(false)} />
            )}
        </div>
    );
    const signedInContent = (
        isEditing ? editingContent : viewingContent
    );


    return (
        <>
            <h1>My Account</h1>
            <p>Manage your profile and account settings.</p>

            {context?.isSignedIn ? signedInContent : (
                <p>Please <Link href="/login">login</Link> to view your account details.</p>
            )}
        </>
    );
}