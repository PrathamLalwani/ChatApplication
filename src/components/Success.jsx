import React from "react";
import Modal from "./Modal";
import styles from "../styles/Common/Success.module.css";
import commonStyles from "../styles/Common/Common.module.css";
import Button from "./BaseComponents/Button";
import { HiCheck } from "react-icons/hi";

const Success = ({ successString, icon, title }) => {
  return (
    <Modal>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <HiCheck
            className={`${styles.icon} ${commonStyles.smallLargeText}`}
          />
        </div>
        <p className={`${commonStyles.mediumText} ${styles.title}`}>
          {title == null ? "Success" : title}
        </p>
        <p className={`${commonStyles.smallText} ${styles.successString}`}>
          {successString == null
            ? "You have successfully completed the process. Please click continue to go forward with the application"
            : successString}
        </p>
        <Button className={`${commonStyles.smallText} ${styles.button}`}>
          CONTINUE
        </Button>
      </div>
    </Modal>
  );
};

export default Success;
