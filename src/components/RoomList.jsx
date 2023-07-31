import React from "react";
import styles from "./../styles/RoomList.module.css";
import { IoLogoWechat } from "react-icons/io5";
import { HiUserGroup } from "react-icons/hi";

const RoomList = ({ onMenuSelect, pmSelected }) => {
  return (
    <div className={styles.roomList}>
      <div
        onClick={onMenuSelect}
        className={`${styles.room} ${pmSelected ? styles.selected : ""}`}
        title="Personal Messages"
      >
        <IoLogoWechat />
        <div className={styles.onIconHover}>{"Personal Messages"}</div>
      </div>
      <div
        onClick={onMenuSelect}
        className={`${styles.room} ${pmSelected ? "" : styles.selected}`}
        title="Chat Rooms"
      >
        <HiUserGroup />
        <div className={styles.onIconHover}>{"Chat Rooms"}</div>
      </div>
    </div>
  );
};

export default RoomList;
