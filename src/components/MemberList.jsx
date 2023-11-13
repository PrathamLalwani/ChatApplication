import React from "react";
import styles from "../styles/MemberList.module.css";

const MemberList = ({
  username,
  list = [],
  onCloseMemberBar,
  showMemberBar,
}) => {
  if (username === undefined || username === null || username === "") return;

  return (
    <div className={styles.main}>
      <div className={styles.profile}>
        <img
          src={`https://robohash.org/${username}`}
          className={`${styles.photo} ${showMemberBar && styles.photoClose}`}
          alt="profile"
        />
        <div className={styles.username}>{username}</div>
      </div>
      <div className={styles.separator}>Members</div>
      <div className={styles.list}>
        {list.map((member) => {
          return (
            <div className={styles.memberContainer} key={member}>
              <div className={styles.member}>{member}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberList;
