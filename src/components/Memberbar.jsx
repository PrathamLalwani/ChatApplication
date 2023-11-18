import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Chat/Memberbar.module.css";
import commonStyles from "../styles/Common/Common.module.css";
import sidebarStyles from "../styles/Chat/Sidebar.module.css";
import Button from "./BaseComponents/Button";
import { IoLogOut } from "react-icons/io5";
import { paths } from "../constants/names";
import { IoAddCircle } from "react-icons/io5";
import UserButton from "./UserButton";

const Memberbar = ({ username, list = [], pmSelected }) => {
  const navigate = useNavigate();

  // console.log(list);

  if (username === undefined || username === null || username === "") return;

  return (
    <div className={styles.main}>
      {/* to show the photo and user name and logout button */}
      <div className={styles.header}>
        <div className={styles.userWallpaper}>
          <div className={styles.userInfo}>
            <p className={commonStyles.smallText}>
              {username.charAt(0).toUpperCase() + username.slice(1)}
            </p>

            <Button
              onClick={() => {
                // logout the user here.
                navigate(paths.login_path, {
                  replace: true,
                });
              }}
              className={`${commonStyles.highMediumText} ${styles.logoutBtn}`}
            >
              <IoLogOut />
            </Button>
          </div>
        </div>
      </div>

      {/* divider */}
      <span className={styles.line}></span>

      {/* includes number of members and add button only if it's group */}
      <div className={styles.memberInfo}>
        <p className={commonStyles.smallText}>{`Members - ${list.length}`}</p>

        {pmSelected ? null : (
          <Button
            onClick={() => {
              // onAddChat();
              // setShowAddUserFrom((prev) => !prev);
            }}
            className={`${sidebarStyles.add} ${commonStyles.mediumText}`}
          >
            <IoAddCircle className={`${commonStyles.mediumText}`} />
          </Button>
        )}
      </div>

      <div className={styles.list}>
        {list.map((value, index) => {
          return (
            <div key={index} className={styles.listElement}>
              <UserButton
                item={{
                  conversationId: index,
                  conversationName: value,
                }}
                selectedConversation={""}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Memberbar;
