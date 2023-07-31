import React, { useMemo, useState } from "react";
import styles from "../styles/ConversationList.module.css";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { AddChatForm } from "./AddChatForm";
import { createPortal } from "react-dom";

const ConversationList = ({
  conversationList,
  onConversationSelect,
  selectedConversation,
  pmSelected,
  onAddUser,
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
    // console.log(list);
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
            {item.conversationName}
          </CustomButton>
        );
      });
    }, [list]);
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <CustomInput
          hint={"Search"}
          minLen={1}
          width={"90%"}
          value={search}
          style={styles.search}
          onChange={onChangeSearch}
        />
      </div>
      <div className={styles.conversationList}>
        <RenderList list={conversationList} />
        {/* <RenderList list={conversationList.filter(filterConversation)} /> */}
        {/* <RenderList
          list={Object.keys(conversationList).forEach(filterConversation)}
        /> */}
        <CustomButton
          className={styles.conversation}
          onClick={() => {
            setShowAddUserFrom(true);
          }}
        >
          {"+"}
        </CustomButton>
        {showAddUserFrom &&
          createPortal(
            <AddChatForm
              pmSelected={pmSelected}
              onCloseForm={() => {
                setShowAddUserFrom(false);
              }}
              addUser={onAddUser}
            >{`Add ${pmSelected ? "User" : "Group"}`}</AddChatForm>,
            document.body
          )}
      </div>
    </div>
  );
};

export default ConversationList;
