import React from "react";
import styles from "../styles/Common/Input.module.css";
import Button from "./BaseComponents/Button";
import { IoIosSend } from "react-icons/io";

const CustomInput = ({
  hint,
  onChange,
  value,
  multiple,
  maxLen,
  minLen,
  onKeyDown,
  containerClassName,
  inputClassName,
  btnClassName,
  onButtonClick,
  requireBtn = true,
}) => {
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <input
        className={`${inputClassName} ${styles.input}`}
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
        <Button
          onClick={onButtonClick}
          className={`${btnClassName} ${styles.btn}`}
        >
          <IoIosSend />
        </Button>
      ) : null}
    </div>
  );
};

export default CustomInput;
