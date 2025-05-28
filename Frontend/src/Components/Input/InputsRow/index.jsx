import s from "./style.module.css";

export const InputsRow = ({children, extraclass}) => <div className={`${s.inputsRow} ${extraclass}`}>{children}</div>