import React from "react";
import styles from "../../styles/Common/Button.module.css";
const Button = ({ onClick, children, buttonType, type, size, className }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles[buttonType]} ${styles[size]} ${className}`}
      children={children}
    />
  );
};

export default Button;
