import React from "react";
import styles from "../styles/Common/Modal.module.css";

const Modal = ({ onCloseModal, children }) => {
  return <div className={styles.main}>{children}</div>;
};

export default Modal;
