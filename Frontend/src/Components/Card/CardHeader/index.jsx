import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./style.module.scss";
import { ButtonAdd } from "../../Button/ButtonAdd";

export const CardHeader = ({ title, icon, onClick, showButton = false }) => {

    return (
        <div className={`${s.wrapper}`}>
            <span className={s.titleContent}><FontAwesomeIcon icon={icon} className={s.icon}/> - <h1 className={s.title}>{title}</h1>
            </span>
            {showButton && <ButtonAdd onClick={onClick} text={'Novo agendamento'}/>}
        </div>
    )
}