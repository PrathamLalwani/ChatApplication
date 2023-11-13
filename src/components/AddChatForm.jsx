import React from "react";
import styles from "../styles/AddChatForm.module.css";
import CustomInput from "./CustomInput";
import { useState } from "react";
import CustomButton from "./CustomButton";
import { useUser } from "../context/UsernameContext";
import { API } from "../constants/names";
import Loading from "./Loading";
import { AddUsers } from "./AddUsers";

export const AddChatForm = ({
  children,
  onCloseForm,
  addChat,

  pmSelected,
}) => {
  const [userSearch, setUserSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const username = useUser().username;
  const [usersToAdd, setUsersToAdd] = useState([username]);

  const onUserSearchChange = (e) => {
    setUserSearch(e.target.value);
  };

  const onAddUserSubmit = (username) => {
    if (usersToAdd.includes(username) || username === "") return;
    console.log(username);
    setUsersToAdd((prev) => [...prev, username]);
  };
  const onRemoveUser = (username) => {
    setUsersToAdd((prev) => prev.filter((x) => x !== username));
  };
  const onAddChatSubmit = (e) => {
    setUserSearch("");
    setLoading(true);
    if (userSearch === username) {
      setLoading(false);
      return;
    }
    if (pmSelected) {
      fetch(`${API.server}${API.addUser}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, friendName: userSearch }),
      })
        .then((res) => res.json())
        .then((value) => {
          setLoading(false);
          console.log(value.body);
          addChat(value.body);
          onCloseForm();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (!pmSelected) {
      fetch(`${API.server}${API.addGroup}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupName: userSearch,
          groupMembers: usersToAdd,
        }),
      })
        .then((res) => res.json())
        .then((value) => {
          console.log(value);
          addChat(value.body);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") onAddChatSubmit(e);
    if (e.key === "Escape") onCloseForm();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <CustomInput
          hint={children}
          value={userSearch}
          onChange={onUserSearchChange}
          // className={styles["form-items"]}
          onKeyDown={onKeyDown}
          requireBtn={false}
        ></CustomInput>
        {loading ? (
          <Loading />
        ) : (
          <CustomButton
            className={`${styles.items} ${styles.button}`}
            onClick={onAddChatSubmit}
          >
            Add
          </CustomButton>
        )}
        <CustomButton
          className={`${styles.items} ${styles.button}`}
          onClick={onCloseForm}
        >
          Cancel
        </CustomButton>
      </div>
      {!pmSelected && (
        <AddUsers
          usersToAdd={usersToAdd}
          onAddUserSubmit={onAddUserSubmit}
          onRemoveUser={onRemoveUser}
        ></AddUsers>
      )}
    </div>
  );
};
