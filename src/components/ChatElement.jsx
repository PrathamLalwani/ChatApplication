import React from "react";
import Space from "./Space";
import styles from "../styles/ChatElement.module.css";

const ChatElement = ({ element, username, index }) => {
  const datetime = new Date(element.time);

  return (
    <div
      className={` ${styles.chatElement} ${
        element.username === username ? styles.thisUser : styles.otherUser
      }`}
      key={`${element.username}${index}`}
    >
      <div className={styles.photoText}>
        <img
          className={styles.profilePicture}
          src={`https://robohash.org/${element.username}?`}
          alt="user"
        />
      </div>
      <Space width={"10px"} />
      <div className={styles.content}>
        <div className={styles.userInfo}>
          <div className={styles.username}>{element.username}</div>
          <Space width={"10px"} />
          <div className={styles.date}>
            {datetime.toDateString()} {datetime.getHours()}:
            {datetime.getMinutes()}:{datetime.getSeconds()}
          </div>
        </div>
        <div className={styles.message}>{element.message}</div>
      </div>
    </div>
  );
};

export default ChatElement;
