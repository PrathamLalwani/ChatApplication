import styles from "../styles/Input.module.css";
import React from "react";

const CustomInput = ({
  hint,
  width,
  // fontSize,
  onChange,
  value,
  multiple,
  maxLen,
  minLen,
  onKeyDown,
  style,
}) => {
  return (
    <div style={{ width: width == null ? "40%" : width }}>
      <input
        className={`${styles.input} ${style}`}
        placeholder={hint == null ? "enter the text" : hint}
        inputMode="text"
        value={value == null ? "" : value}
        onChange={onChange}
        multiple={multiple}
        maxLength={maxLen}
        minLength={minLen}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default CustomInput;
