import React from "react";
import Space from "./Space";
import styles from "../styles/ChatElement.module.css";

const ChatElement = ({ element, username, index }) => {
  const firstLetter = element.username.toUpperCase().substring(0, 1);

  return (
    <div
      className={` ${styles.chatElement} ${
        element.username === username ? styles.thisUser : styles.otherUser
      }`}
      key={`${element.username}${index}`}
    >
      <div className={styles.photoText}>{firstLetter}</div>
      <Space width={"10px"} />
      <div className={styles.content}>
        <div className={styles.username}>{element.username}</div>
        <div className={styles.message}>{element.message}</div>
      </div>
    </div>
  );
};

export default ChatElement;
