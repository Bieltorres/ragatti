import React from 'react';
import s from "./style.module.scss";
import { useSelector } from 'react-redux';

export const InputSelectText = ({
    text_label,
    options = [], 
    name,
    value,
    extraClass,
    onChange,
    disabled = false,
    width,
    placeHolder,
    padding,
    ...args
}) => {

    const widthClasses = {
        estado: s.widthEstado,
        pais: s.widthPais,
        grupo: s.widthGrupo,
    };

    return (
        <div className={s.inputSelectWrapper} {...args} style={{width: width}}>
            <span className={s.label}>{text_label}</span>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`${s.select} ${widthClasses[name] || ''} ${extraClass || ''}`}
                style={{padding: padding ? padding : '1rem'}}
                disabled={disabled}
            >
                <option value="">{text_label}</option>
                {Array.isArray(options) && options.length > 0 ? (
                    options.map((option, index) => (
                        <option key={index} value={option} className={s.option}>
                            {option}
                        </option>
                    ))
                ) : (
                    <option disabled>Não há opções disponíveis</option> 
                )}
            </select>
        </div>
    );
};
