import React from "react";
import Button from "./BaseComponents/Button";
import styles from "../styles/Common/UserButton.module.css";

const UserButton = ({ item, style, onUserBtnClick, selectedConversation }) => {
  return (
    <Button
      key={item.conversationId}
      className={`${styles.container} ${style} ${
        item.conversationName === selectedConversation ? styles.selected : ""
      }`}
      onClick={() => {
        if (onUserBtnClick != null) {
          onUserBtnClick(item);
        }
      }}
    >
      <img
        className={styles.image}
        src={`https://robohash.org/${item.conversationName}?`}
        alt={item.conversationName}
      />
      <div className={styles.name}>
        <p className={`${styles.title}`}>
          {item.conversationName.charAt(0).toUpperCase() +
            item.conversationName.slice(1)}
        </p>
      </div>
    </Button>
  );
};

export default UserButton;
