import React, { useState, useMemo } from "react";
import styles from "../styles/Chat/Sidebar.module.css";
import commonStyles from "../styles/Common/Common.module.css";
import Button from "./BaseComponents/Button";
import CustomInput from "./CustomInput";
import UserButton from "./UserButton";
import { IoAddCircle } from "react-icons/io5";
import { AddChatForm } from "./AddChatForm";

const Sidebar = ({
  onChatSelect,
  pmSelected,
  conversationList,
  currentConversation,
  onConversationSelect,
  onAddChat,
  isSideBarClosed,
}) => {
  const [search, setSearch] = useState("");
  const [showAddUserFrom, setShowAddUserFrom] = useState(false);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onUserBtnClick = (element) => {
    onConversationSelect(element);
  };

  const RenderList = ({ list }) => {
    return useMemo(() => {
      return Object.keys(list).map((key, index) => {
        let item = list[key];

        return (
          <UserButton
            key={key}
            item={item}
            onUserBtnClick={onUserBtnClick}
            selectedConversation={currentConversation}
            style={styles.conversationItem}
          />
        );
      });
    }, [list]);
  };

  return (
    <div className={`${styles.main} ${isSideBarClosed && styles.closed}`}>
      {/* heading for sidebar */}
      {/* {showAddUserFrom && <AddChatForm />} */}
      <div className={styles.heading}>
        <h1 className={`${commonStyles.smallLargeText} ${styles.headingText}`}>
          Chats
        </h1>
        <Button
          onClick={() => {
            // onAddChat();
            // setShowAddUserFrom((prev) => !prev);
          }}
          className={`${styles.add} `}
        >
          <IoAddCircle className={styles.addIcon} />
        </Button>
      </div>

      {/* switch button for personal and room */}
      <div className={styles.switch}>
        <span
          className={`${styles.selected} ${!pmSelected && styles.move}`}
        ></span>
        <div className={styles.conversationType}>
          <div
            onClick={() => onChatSelect(true)}
            className={`${commonStyles.smallText} ${styles.child}`}
          >
            Personal
          </div>
          <div
            onClick={() => onChatSelect(false)}
            className={`${commonStyles.smallText} ${styles.child} `}
          >
            Groups
          </div>
        </div>
        {/* <div className={styles.wrapper}> */}
        {/* </div> */}
      </div>

      {/* search for the user */}

      <CustomInput
        hint={"Search"}
        minLen={1}
        value={search}
        containerClassName={styles.search}
        inputClassName={`${styles.searchInput} ${commonStyles.smallText}`}
        onChange={onChangeSearch}
        requireBtn={false}
      />

      {/* rendering the list of the users */}

      <div className={styles.list}>
        <RenderList
          list={Object.keys(conversationList)
            .filter((x) => {
              return x.includes(search);
            })
            .reduce((obj, key) => {
              obj[key] = conversationList[key];
              return obj;
            }, {})}
        />
      </div>
    </div>
  );
};

export default Sidebar;
