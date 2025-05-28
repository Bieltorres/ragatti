import { useSelector } from "react-redux";
import { formatarTelefone } from "../../../Functions";
import s from "./style.module.scss"

export const InputTelefone = ({
    text_label,
    name,
    value,
    onChange,
    placeholder,
    disabled = false,
}) => {
    const isDark = useSelector((state) => state.theme.isDarkMode);

    const handleInput = (event) => {
        const novoValor = formatarTelefone(event.target.value);
        onChange({ target: { name, value: novoValor } });
    };

    return (
        <div className={`${s.contentInput} ${isDark ? s.darkMode : s.lightMode}`}>
            <span className={s.label}>{text_label}</span>
            <input
                className={s.input}
                type="text"
                name={name}
                value={value}
                onInput={handleInput}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={15} 
            />
        </div>
    );
};