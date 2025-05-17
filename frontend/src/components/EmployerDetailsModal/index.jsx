import "./EmployerDetailsModal.css";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

const EmployerDetailsModal = ({ isOpen, onRequestClose, employerData }) => {
    const [showActiveEmployees, setShowActiveEmployees] = useState(false);
    const [showInactiveEmployees, setShowInactiveEmployees] = useState(false);

    if (!employerData) return null;

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="employer-details-modal" overlayClassName="employer-details-overlay">

            <h2>Detalhes do Empregador</h2>
            <div>
                <p><strong>Nome:</strong> {employerData.name}</p>
                <p><strong>CPF:</strong> {employerData.cpf}</p>
                <p><strong>Email:</strong> {employerData.email}</p>
                <p><strong>Telefone:</strong> {employerData.phone}</p>
                <p><strong>Rua:</strong> {employerData.street}</p>
                <p><strong>Bairro:</strong> {employerData.neighborhood}</p>
                <p><strong>Número:</strong> {employerData.home_number}</p>
            </div>

            <div className="employee-box active-employees">
                <h3 onClick={() => setShowActiveEmployees(!showActiveEmployees)} className="toggle-section">
                    Empregados Ativos {showActiveEmployees ? "▼" : "▶"}
                </h3>
                {showActiveEmployees && employerData.activeEmployees && employerData.activeEmployees.length > 0 ? (
                    <div className="employee-list">
                        {employerData.activeEmployees.map((employee) => (
                            <div key={employee.id} className="employee-item">
                                <p><strong>Nome:</strong> {employee.name}</p>
                                <p><strong>Função:</strong> {employee.job_function}</p>
                                <p><strong>CPF:</strong> {employee.cpf}</p>
                                <p><strong>Ínicio do contrato:</strong> {employee.contract_start_date}</p>
                                <p><strong>Acesso ao app:</strong> {employee.app_access_status}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    showActiveEmployees && <p className="no-employees">Nenhum empregado ativo encontrado.</p>
                )}
            </div>

            <div className="employee-box inactive-employees">
                <h3 onClick={() => setShowInactiveEmployees(!showInactiveEmployees)} className="toggle-section">
                    Empregados Inativos {showInactiveEmployees ? "▼" : "▶"}
                </h3>
                {showInactiveEmployees && employerData.inactiveEmployees && employerData.inactiveEmployees.length > 0 ? (
                    <div className="employee-list">
                        {employerData.inactiveEmployees.map((employee) => (
                            <div key={employee.id} className="employee-item">
                                <p><strong>Nome:</strong> {employee.name}</p>
                                <p><strong>Função:</strong> {employee.job_function}</p>
                                <p><strong>CPF:</strong> {employee.cpf}</p>
                                <p><strong>Fim do contrato:</strong> {employee.contract_end_date}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    showInactiveEmployees && <p className="no-employees">Nenhum empregado inativo encontrado.</p>
                )}
            </div>

            <button onClick={onRequestClose} className="close-modal-button">&times;</button>
        </Modal>
    );
};

export default EmployerDetailsModal;