import React, { useState } from 'react';
import Modal from "react-modal";
import './StatusConfirmModal.css';

Modal.setAppElement("#root");

const StatusConfirmModal = ({ isOpen, onConfirm, onCancel, contractName, currentStatus }) => {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        if (!password.trim()) {
            return;
        }
        
        setIsLoading(true);
        await onConfirm(password);
        setIsLoading(false);
        setPassword("");
    };

    const handleCancel = () => {
        setPassword("");
        onCancel();
    };

    const action = currentStatus ? "inativar" : "ativar";
    const statusColor = currentStatus ? "#ff4444" : "#4CAF50";

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCancel}
            className="status-confirm-modal-content"
            overlayClassName="status-confirm-modal-overlay"
            contentLabel="Confirmar Alteração de Status"
        >
            <button className="close-modal" onClick={handleCancel}>&times;</button>
            
            <div className="status-confirm-modal">
                <h2>Confirmar Alteração de Status</h2>
                <div className="status-confirm-content">
                    <p>
                        Você está prestes a <strong style={{ color: statusColor }}>{action}</strong> o contrato de:
                    </p>
                    <p className="contract-name">{contractName}</p>
                    <p className="confirmation-text">
                        Digite sua senha para confirmar esta alteração:
                    </p>
                    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleConfirm();
                    }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite sua senha"
                            className="password-input"
                            autoComplete="current-password"
                            onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
                        />
                    </form>
                </div>
                
                <div className="modal-actions">
                    <button 
                        onClick={handleCancel} 
                        className="btn btn-cancel"
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleConfirm} 
                        className="btn btn-confirm"
                        disabled={!password.trim() || isLoading}
                        style={{ backgroundColor: statusColor }}
                    >
                        {isLoading ? "Processando..." : `${action.charAt(0).toUpperCase() + action.slice(1)} Contrato`}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default StatusConfirmModal;
