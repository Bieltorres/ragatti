import s from "./style.module.scss";
import {useSelector} from "react-redux";


export const BtnCancel = ({ onClick, type, text, ...args}) => {

    const isDark = useSelector(state => state.theme.isDarkMode);
    
    return (
        <button className={`${s.btnCancel} ${isDark ? s.darkMode : s.lightMode}`} {...args} onClick={onClick} type={type}>{text}</button>
    )
}
