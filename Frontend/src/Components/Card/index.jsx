import s from "./style.module.scss";

export const Card = ({children, extraclass, ...args}) => {
    
    return (
        <div className={s.wrapper} {...args}>{children}</div>
    )
}
