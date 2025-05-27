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
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={passwordAdmin}
                    onChange={(e) => setPasswordAdmin(e.target.value)}
                    className="input-password"
                />
                <button
                    className="button-confirm"
                    onClick={handleConfirm}
                    disabled={!passwordAdmin}
                >
                    Confirmar
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
