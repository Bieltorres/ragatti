import { useSelector } from "react-redux";
import s from "./style.module.css";

export const CardBody = ({ children, extraClass }) => {

    const isDark = useSelector(state => state.theme.isDarkMode);

    return (
        <div className={`${s.wrapper} ${isDark ? s.darkMode : s.lightMode} ${extraClass}`} > {children} </div>

    )
}