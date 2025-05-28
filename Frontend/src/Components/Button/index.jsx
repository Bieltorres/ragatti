import s from "./style.module.css";

export const Button = ({onClick, disabled, text}) => <button className={s.button} onClick={onClick} disabled={disabled}>{text}</button>