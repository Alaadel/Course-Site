import Modal from "../common/containers/Modal";

export default function ResetPasswordModal({ onCancel }: { onCancel: () => void }) {

    function handleConfirmReset() {

    }
    function handleCancel() {
        if (onCancel) {
            onCancel();
        }
    }

    return (
        <Modal open={true} onClose={handleCancel}>
            <h2>Reset Password</h2>
            <p>This is where the reset password form will be displayed.</p>

            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm New Password" />
            
            <button onClick={handleConfirmReset}>Reset Password</button>
            <button onClick={handleCancel}>Cancel</button>
        </Modal>
    );
}