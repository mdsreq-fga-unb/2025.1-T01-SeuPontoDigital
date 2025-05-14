import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;

    return (
        <div className="container-modal">
            <div className="container-modal-open">
                <p>{message}</p>
                <div className="container-modal-buttons">
                <button className="button-cancel" onClick={onCancel}>Cancelar</button>
                <button className="button-confirm" onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
