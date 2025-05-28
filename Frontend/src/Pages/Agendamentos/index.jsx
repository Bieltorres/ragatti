import { useSelector } from "react-redux";
import s from "./style.module.css";
import { Loader } from "../../Components/Loader";
import { useEffect, useState } from "react";
import { Card } from "../../Components/Card";
import React from "react";
import { Table } from "../../Components/Table";
import { apiUrl, token } from "../../Functions";
import { CardHeader } from "../../Components/Card/CardHeader";
import { FormularioAgendamento } from "../../Components/FormularioAgendamento";

export const Agendamentos = () => {

    const [loading, setLoading] = useState(false);
    const [showNovoAgendamento, setShowNovoAgendamento] = useState(false);

    const [formData, setFormData] = useState();
    const [options, setOptions] = useState([]);
    const [userPhone, setUserPhone] = useState('');

    const isAdmin = useSelector(state => state.user.isAdmin);
    const userName = useSelector(state => state.user.name);

    const columns = [
        { title: 'Nome', accessor: 'nome' },
        { title: 'Telefone', accessor: 'telefone' },
        { title: 'Especialidade', accessor: 'especialidade' },
        { title: 'Data', accessor: 'data' },
        { title: 'Horário', accessor: 'horario' },
        { title: 'Status', accessor: 'status' },
    ];

    const userData = useSelector(state => state.user.userData);
    console.log(userData)

    const handleClick = () => {
        setShowNovoAgendamento(true);
    }

    const handleCloseFormulario = () => {
        setShowNovoAgendamento(false);
    }

    useEffect(() => {
        fetchData();
        fetchAgendamentos();
    }, [apiUrl]);

    const fetchAgendamentos = async () => {
        setLoading(true);

        try {
            const url = isAdmin ? `${apiUrl}/agendamentos?nome=admin` : `${apiUrl}/agendamentos?nome=${userName}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erro ao buscar agendamentos');
            }

            const data = await response.json();
            setFormData(data);

        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            alert(error.message);
        }
        setLoading(false);
    };

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/horarios`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setOptions(data.horarios);

        } catch (error) {
            console.error('Erro catch:', error);
        }
        setLoading(false);
    };

    const handleSubmitAgendamento = async (dadosAgendamento) => {
        setLoading(true);
        try {
            setUserPhone(dadosAgendamento.telefone);

            const response = await fetch(`${apiUrl}/agendamentos/criar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosAgendamento),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao criar agendamento');
            }

            await fetchAgendamentos();
            setShowNovoAgendamento(false);

        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            alert(error.message);
        }
        setLoading(false);
    }

    const handleApprove = async (id) => {
        setLoading(true);
        try {
            console.log('Aprovando agendamento:', id);
            const response = await fetch(`${apiUrl}/agendamentos/aprovar/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao aprovar agendamento');
            }

            const data = await response.json();
            console.log('Agendamento aprovado:', data);

            await fetchAgendamentos();

        } catch (error) {
            console.error('Erro ao aprovar agendamento:', error);
            alert('Erro ao aprovar agendamento. Por favor, tente novamente.');
        }
        setLoading(false);
    }

    const handleReject = async (id) => {
        setLoading(true);
        try {
            console.log('Reprovando agendamento:', id);
            const response = await fetch(`${apiUrl}/agendamentos/reprovar/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao reprovar agendamento');
            }

            const data = await response.json();
            console.log('Agendamento reprovado:', data);

            await fetchAgendamentos();

        } catch (error) {
            console.error('Erro ao reprovar agendamento:', error);
            alert('Erro ao reprovar agendamento. Por favor, tente novamente.');
        }
        setLoading(false);
    }

    return (
        <div className={s.wrapper}>
            <section className={s.contentRight}>
                <Card extraclass={s.cardCampaing}>
                    <CardHeader title="Agendamentos" icon={'fa-solid fa-clock'} showButton={true} onClick={handleClick} />
                    <Table
                        columns={columns}
                        data={formData}
                        showActions={true}
                        itemsPerPage={100}
                        pagination={false}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                </Card>
            </section>

            <FormularioAgendamento
                isOpen={showNovoAgendamento}
                onClose={handleCloseFormulario}
                onSubmit={handleSubmitAgendamento}
                options={options}
            />

            {loading && <Loader />}
        </div >
    )
}