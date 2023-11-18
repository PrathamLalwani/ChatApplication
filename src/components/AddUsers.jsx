import React, { useState } from "react";
import Button from "./BaseComponents/Button";
import styles from "../styles/Chat/AddUsers.module.css";
import CustomInput from "./CustomInput";

import { AiOutlineClose } from "react-icons/ai";
import { useUser } from "../context/UsernameContext";

export const AddUsers = ({ usersToAdd, onAddUserSubmit, onRemoveUser }) => {
  const [userSearch, setUserSearch] = useState("");
  const username = useUser().username;
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
      {/* <Space height={10} /> */}
      <div className={styles.functions}>
        <CustomInput
          hint={"Username to add"}
          minLen={1}
          requireBtn={false}
          value={userSearch}
          onChange={onUserSearchChange}
        ></CustomInput>
        <Button className={styles.addBtn} onClick={onAdd}>
          Add
        </Button>
      </div>
      {/* <Space height={10} /> */}
      <div className={styles.list}>
        {usersToAdd.map((user) => (
          <div className={styles.userElementContainer} key={user}>
            <div className={styles.userElement}>
              <div>{user}</div>
              {/* <Space width={10}></Space> */}
              <Button className={styles.closeBtn} onClick={removeUser(user)}>
                {user !== username && (
                  <AiOutlineClose className={styles.closeIcon} />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
