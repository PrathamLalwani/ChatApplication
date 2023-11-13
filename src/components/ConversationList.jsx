import React, { useMemo, useState } from "react";
import styles from "../styles/ConversationList.module.css";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { AddChatForm } from "./AddChatForm";
import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";
import { AiOutlineUserAdd } from "react-icons/ai";

const ConversationList = ({
  conversationList,
  onConversationSelect,
  selectedConversation,
  pmSelected,
  onAddChat,
  onAddGroup,
  onCloseSideBar,
}) => {
  const [search, setSearch] = useState("");
  const [showAddUserFrom, setShowAddUserFrom] = useState(false);
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onConversationBtnClick = (element) => {
    onConversationSelect(element);
  };

  const RenderList = ({ list }) => {
    return useMemo(() => {
      return Object.keys(list).map((key, index) => {
        let item = list[key];
        return (
          <CustomButton
            key={item.conversationId}
            className={`${styles.conversation} ${
              item.conversationName === selectedConversation
                ? styles.selected
                : ""
            }`}
            onClick={() => {
              onConversationBtnClick(item);
            }}
          >
            <img
              className={styles.conversationImg}
              src={`https://robohash.org/${item.conversationName}?`}
              alt={item.conversationName}
            />
            {item.conversationName}
          </CustomButton>
        );
      });
    }, [list]);
  };

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <div className={styles.title}>
          {pmSelected ? "Personal" : "Group"} Messages
        </div>
        {/* <CustomButton onClick={onCloseSideBar} className={styles.closeBtn}>
            <IoIosClose />
          </CustomButton> */}
      </div>
      <CustomInput
        hint={"Search"}
        minLen={1}
        value={search}
        className={styles.search}
        onChange={onChangeSearch}
        requireBtn={false}
      />
      <div className={styles.conversationList}>
        <RenderList list={conversationList} />

        <CustomButton
          className={`${styles.conversation} ${styles.addBtn}`}
          onClick={() => {
            setShowAddUserFrom(true);
          }}
        >
          <AiOutlineUserAdd />
        </CustomButton>
        {showAddUserFrom &&
          createPortal(
            <AddChatForm
              pmSelected={pmSelected}
              onCloseForm={() => {
                setShowAddUserFrom(false);
              }}
              addChat={onAddChat}
              addGroup={onAddGroup}
            >{`Add ${pmSelected ? "User" : "Group"}`}</AddChatForm>,
            document.body
          )}
      </div>
    </div>
  );
};

export default ConversationList;
