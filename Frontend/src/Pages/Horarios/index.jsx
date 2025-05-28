import s from "./style.module.css";
import { Loader } from "../../Components/Loader";
import { useEffect, useState } from "react";
import { Card } from "../../Components/Card";
import React from "react";
import { Table } from "../../Components/Table";
import { apiUrl, token } from "../../Functions";
import { ButtonAdd } from "../../Components/Button/ButtonAdd";
import { CardHeader } from "../../Components/Card/CardHeader";

export const Horarios = () => {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState();

    const columns = [
        { title: 'Data', accessor: 'data' },
        { title: 'Horário', accessor: 'horario' },
        { title: 'Status', accessor: 'status' },
    ];

    useEffect(() => {
        fetchData();
    }, [apiUrl]);

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
                setFormData(data.horarios);
 
            } catch (error) {
                console.error('Erro catch:', error);
            }
            setLoading(false);
        };

    return (
        <div className={s.wrapper}>
            <section className={s.contentRight}>
                <Card extraclass={s.cardCampaing}>
                    <CardHeader title="Horários disponíveis" icon={'fa-solid fa-clock'} />
                    <Table columns={columns} data={formData} showActions={false} itemsPerPage={5} pagination={false} />
                </Card>
            </section>
            {loading && <Loader />}
        </div >
    )
}