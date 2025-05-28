import s from './style.module.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Input = ({
  text_label,
  type,
  name,
  value,
  placeholder,
  onChange,
  disabled,
  title,
  min,
  width
}) => {

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.contentInput} style={{ width: width }}>
      <span className={s.label}>{text_label}</span>
      <div className={s.inputWrapper}>
        <input
          className={`${s.input} ${type === 'password' ? s.passwordInput : ''}`}
          onChange={onChange}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          title={title}
          min={min}
          style={{ width: '100%' }}
        />
        {type === 'password' && (
          <button
            type="button"
            className={s.passwordToggle}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FontAwesomeIcon className={s.iconEye} icon="fa-solid fa-eye-slash" /> : <FontAwesomeIcon className={s.iconEye} icon="fa-solid fa-eye" />}
          </button>
        )}
      </div>
    </div>
  );
};
