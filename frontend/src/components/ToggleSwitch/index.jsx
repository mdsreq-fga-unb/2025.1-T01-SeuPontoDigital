import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ isOn, onToggle, disabled = false }) => {
    return (
        <div 
            className={`toggle-switch ${disabled ? 'disabled' : ''}`}
            onClick={disabled ? undefined : onToggle}
            title={disabled ? 'Não é possível alterar' : isOn ? 'Clique para inativar' : 'Clique para ativar'}
        >
            <div className={`toggle-switch-slider ${isOn ? 'on' : 'off'}`}>
                <div className="toggle-switch-knob"></div>
            </div>
            <span className="toggle-switch-label">
                {isOn ? 'Ativo' : 'Inativo'}
            </span>
        </div>
    );
};

export default ToggleSwitch;
