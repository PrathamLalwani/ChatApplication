import React, { useState } from "react";
import CustomButton from "./CustomButton";
import styles from "../styles/AddUsers.module.css";
import CustomInput from "./CustomInput";
import { IoCloseCircle } from "react-icons/io5";
import Space from "./Space";

// const UserButton = ({ username, removeUserButton }) => {
//   console.log(username);
//   return (
//     <div className={styles.userButton}>
//       <div>{username}</div>
//       <div onClick={removeUserButton}>x</div>
//     </div>
//   );
// };

export const AddUsers = ({ usersToAdd, onAddUserSubmit, onRemoveUser }) => {
  const [userSearch, setUserSearch] = useState("");
  const onUserSearchChange = (e) => {
    setUserSearch(e.target.value);
  };

  const onAdd = () => {
    onAddUserSubmit(userSearch.replace(" ", ""));
    setUserSearch("");
  };

  const removeUser = (username) => {
    return () => onRemoveUser(username);
  };

  return (
    <div className={styles.main}>
      <Space height={10} />
      <div className={styles.functions}>
        <CustomInput
          hint={"Username to add"}
          minLen={1}
          width={"90%"}
          value={userSearch}
          onChange={onUserSearchChange}
        ></CustomInput>
        <CustomButton className={styles.addBtn} onClick={onAdd}>
          Add
        </CustomButton>
      </div>
      <Space height={10} />
      <div className={styles.list}>
        {usersToAdd.map((user) => (
          <div className={styles.userElementContainer} key={user}>
            <div className={styles.userElement}>
              <div>{user}</div>
              <Space width={10}></Space>
              <CustomButton
                className={styles.closeBtn}
                onClick={removeUser(user)}
              >
                <IoCloseCircle className={styles.closeIcon} />
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
