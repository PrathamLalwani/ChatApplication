import React from "react";
import styles from "../styles/Input.module.css";
import CustomButton from "./CustomButton";
import { IoIosSend } from "react-icons/io";

const CustomInput = ({
  hint,
  onChange,
  value,
  multiple,
  maxLen,
  minLen,
  onKeyDown,
  className,
  onButtonClick,
  requireBtn = true,
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <input
        className={styles.input}
        placeholder={hint == null ? "enter the text" : hint}
        inputMode={"text"}
        value={value == null ? "" : value}
        onChange={onChange}
        multiple={multiple}
        maxLength={maxLen}
        minLength={minLen}
        onKeyDown={onKeyDown}
      />
      {requireBtn ? (
        <CustomButton onClick={onButtonClick} className={styles.btn}>
          <IoIosSend />
        </CustomButton>
      ) : null}
    </div>
  );
};

export default CustomInput;
