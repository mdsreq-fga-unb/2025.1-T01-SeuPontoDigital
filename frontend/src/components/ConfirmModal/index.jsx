import Modal from "react-modal";
import { useState } from "react";
import "./ConfirmModal.css";

Modal.setAppElement("#root");

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message, nameEmployer }) => {
    const [passwordAdmin, setPasswordAdmin] = useState("");

    const handleConfirm = () => {
        onConfirm(passwordAdmin);
        setPasswordAdmin("");
    };

    const handleClose = () => {
        setPasswordAdmin("");
        onCancel();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            className="container-modal-open"
            overlayClassName="container-modal-overlay"
            contentLabel="Confirmação"
        >
            <button className="close-modal" onClick={handleClose}>&times;</button>
            <p>{message} <span>{nameEmployer}</span></p>
            
            <div className="container-modal-input-button">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleConfirm();
                }}>
                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={passwordAdmin}
                        onChange={(e) => setPasswordAdmin(e.target.value)}
                        className="input-password"
                        autoComplete="current-password"
                    />
                    <button
                        type="submit"
                        className="button-confirm"
                        disabled={!passwordAdmin}
                    >
                        Confirmar
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
