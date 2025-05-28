import { Link } from "react-router-dom";
import s from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ButtonAdd = ({onClick, disabled, urlRedirect, extraclass, text, dataTooltip}) => <Link to={urlRedirect} className={`${s.addButton} ${extraclass}`} onClick={onClick} disabled={disabled} data-tooltip={dataTooltip}><FontAwesomeIcon icon={'icon="fa-solid fa-plus'} />{text}</Link>