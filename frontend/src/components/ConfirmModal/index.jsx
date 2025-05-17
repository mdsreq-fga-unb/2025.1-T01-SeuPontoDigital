import Modal from "react-modal";
import { useState } from "react";
import "./ConfirmModal.css";

Modal.setAppElement("#root");

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message, nameEmployer }) => {
    const [password, setPassword] = useState("");

    const handleConfirm = () => {
        onConfirm(password);
        setPassword("");
    };

    const handleClose = () => {
        setPassword("");
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-password"
                />
                <button
                    className="button-confirm"
                    onClick={handleConfirm}
                    disabled={!password}
                >
                    Confirmar
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
