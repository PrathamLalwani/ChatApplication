import React from "react";
import Modal from "./Modal";
import styles from "../styles/Common/Error.module.css";
import commonStyles from "../styles/Common/Common.module.css";
import Button from "./BaseComponents/Button";
import { IoIosClose } from "react-icons/io";

const Error = ({ onCancel, errorString, icon, title }) => {
  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <IoIosClose
            className={`${styles.icon} ${commonStyles.smallLargeText}`}
          />
        </div>
        <p className={`${commonStyles.mediumText} ${styles.title}`}>
          {title == null ? "Error Occured" : title}
        </p>
        <p className={`${commonStyles.smallText} ${styles.errorString}`}>
          {errorString === null
            ? "Something happened during the process. Please try again later!"
            : errorString}
        </p>
        <Button
          onClick={onCancel}
          className={`${commonStyles.smallText} ${styles.button}`}
        >
          CANCEL
        </Button>
      </div>
    </Modal>
  );
};

export default Error;
