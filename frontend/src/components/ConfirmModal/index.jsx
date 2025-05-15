import "./ConfirmModal.css";
import { useState } from "react";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(password); 
        setPassword("");
    };

    return (
        <div className="container-modal">
            <div className="container-modal-open">
                <button className="close-modal" onClick={onCancel}>×</button>
                <p>{message}</p>
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-password"
                />
                <div className="container-modal-buttons">
                    <button className="button-confirm" onClick={handleConfirm} disabled={!password}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;