import Modal from "react-modal";
import './SimpleConfirmModal.css';

Modal.setAppElement("#root");

const SimpleConfirmModal = ({ isOpen, onConfirm, onCancel, contractName, currentStatus, title = "Confirmar Alteração" }) => {
    const action = currentStatus ? "desativar" : "ativar";
    const statusColor = currentStatus ? "#ff4444" : "#4CAF50";

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCancel}
            className="simple-confirm-modal-content"
            overlayClassName="simple-confirm-modal-overlay"
            contentLabel="Confirmar Alteração"
        >
            <button className="close-modal" onClick={onCancel}>&times;</button>
            
            <div className="simple-confirm-modal">
                <h2>{title}</h2>
                <div className="simple-confirm-content">
                    <p>
                        Você está prestes a <strong style={{ color: statusColor }}>{action}</strong> o acesso ao aplicativo para:
                    </p>
                    <p className="contract-name">{contractName}</p>
                    <p className="confirmation-text">
                        Deseja continuar?
                    </p>
                </div>
                
                <div className="modal-actions">
                    <button 
                        onClick={onCancel} 
                        className="btn btn-cancel"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="btn btn-confirm"
                        style={{ backgroundColor: statusColor }}
                    >
                        {action.charAt(0).toUpperCase() + action.slice(1)} Acesso
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default SimpleConfirmModal;
