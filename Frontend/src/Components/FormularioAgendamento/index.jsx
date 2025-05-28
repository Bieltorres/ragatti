import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./style.module.css";
import { Input } from "../Input";
import { InputSelectText } from "../Input/InputSelectText";
import { Button } from "../Button";

export const FormularioAgendamento = ({ isOpen, onClose, onSubmit, options }) => {
    const isAdmin = useSelector(state => state.user.isAdmin);
    const userName = useSelector(state => state.user.name);

    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        especialidade: "",
        dataHora: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isAdmin) {
            setFormData(prev => ({
                ...prev,
                nome: userName
            }));
        }
    }, [isAdmin, userName]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await onSubmit(formData);
            setFormData({
                nome: isAdmin ? "" : userName,
                telefone: "",
                especialidade: "",
                dataHora: ""
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        setFormData({
            nome: isAdmin ? "" : userName,
            telefone: "",
            especialidade: "",
            dataHora: ""
        });
        setError("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={s.modalOverlay}>
            <div className={s.modalContent}>
                <div className={s.modalHeader}>
                    <h2>Novo Agendamento</h2>
                    <button className={s.closeButton} onClick={handleCancel}>×</button>
                </div>

                {error && (
                    <div className={s.errorMessage}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={s.form}>
                    <div className={s.inputGroup}>
                        <Input
                            text_label="Nome"
                            type="text"
                            name="nome"
                            value={formData.nome}
                            placeholder="Digite o nome do paciente"
                            onChange={handleInputChange}
                            disabled={!isAdmin}
                        />
                    </div>

                    <div className={s.inputGroup}>
                        <Input
                            text_label="Telefone"
                            type="tel"
                            name="telefone"
                            value={formData.telefone}
                            placeholder="(00) 00000-0000"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={s.inputGroup}>
                        <Input
                            text_label="Especialidade"
                            type="text"
                            name="especialidade"
                            value={formData.especialidade}
                            placeholder="Digite a especialidade"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={s.inputGroup}>
                        <InputSelectText
                            placeHolder="Selecione a data e hora"
                            text_label="Data e Hora"
                            name="dataHora"
                            value={formData.dataHora}
                            options={options.map(horario => `${horario.data} ${horario.horario}`)}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={s.buttonGroup}>
                        <Button
                            text="Cancelar"
                            onClick={handleCancel}
                        />
                        <Button
                            text="Agendar"
                            onClick={handleSubmit}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}; 