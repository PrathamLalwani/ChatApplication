import React, { useEffect, useState, useCallback } from "react";
import styles from "../styles/Chat/MessageContent.module.css";
import commonStyles from "../styles/Common/Common.module.css";
import { useUser } from "../context/UsernameContext";
import { useSocket } from "../context/SocketContext";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatElement from "./ChatElement";
import CustomInput from "./CustomInput";
import Button from "./BaseComponents/Button.jsx";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { BsFillPeopleFill } from "react-icons/bs";

const MessageContent = ({
  onMenuBtnClick,
  currentConversation,
  onAccountBtnClick,
  currentMessages,
  addMessage,
  pmSelected,
}) => {
  const usernameContext = useUser();
  const username = usernameContext.username;
  const socket = useSocket();
  const [message, setMessage] = useState("");

  const onChangeInputText = (e) => {
    setMessage(e.target.value);
  };

  const onSendMessage = (e) => {
    let time = Date.now();
    if (message) {
      addMessage({
        username: username,
        message: message,
        time: time,
      });
      socket.emit("send-message", {
        message: message,
        username: username,
        isPersonal: pmSelected,
        conversationName: currentConversation,
        time: time.toString(),
      });
      setMessage("");
    }
  };

  const onReceiveMessage = useCallback(
    (message) => {
      addMessage(message);
    },
    [addMessage],
  );

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", onReceiveMessage);
    return () => socket.off("receive-message");
  }, [socket, onReceiveMessage]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") onSendMessage();
  };

  return (
    <div className={styles.main}>
      {/* header to show the top bar in message content */}
      <div className={styles.header}>
        <div className={styles.personInfo}>
          <Button
            className={`${styles.menuBtn} ${commonStyles.lowMediumText}`}
            onClick={onMenuBtnClick}
          >
            <HiOutlineMenuAlt2 />
          </Button>
          <div className={`${styles.personContainer}`}>
            <img
              className={styles.personImage}
              src={`https://robohash.org/${currentConversation}?`}
              alt={currentConversation}
            />
            <div className={styles.personName}>
              <p className={`${commonStyles.smallText} ${styles.personTitle}`}>
                {currentConversation.charAt(0).toUpperCase() +
                  currentConversation.slice(1)}
              </p>

              <p
                className={`${commonStyles.xSmallText} ${styles.personSubtitle}`}
              >
                @{currentConversation}
              </p>
            </div>
          </div>
        </div>

        <Button
          className={`${styles.menuBtn} ${commonStyles.lowMediumText}`}
          onClick={onAccountBtnClick}
        >
          <BsFillPeopleFill />
        </Button>
      </div>

      {/* scrolling for the messages */}
      <div className={styles.scroll}>
        <InfiniteScroll dataLength={currentMessages.length} hasMore={false}>
          {currentMessages.map((element, index) => {
            return (
              <ChatElement
                element={element}
                index={index}
                username={username}
                key={`${element.username}${index}`}
              />
            );
          })}
        </InfiniteScroll>
      </div>

      {/* text input to enter and send the message  */}
      {currentConversation && (
        <CustomInput
          onChange={onChangeInputText}
          onKeyDown={onKeyDown}
          hint={`Message ${currentConversation}`}
          value={message}
          multiple={true}
          maxLen={1024}
          minLen={1}
          onButtonClick={onSendMessage}
          containerClassName={styles.inputContainer}
          inputClassName={`${styles.input} ${commonStyles.smallText}`}
          btnClassName={`${styles.inputBtn} ${commonStyles.smallText}`}
        />
      )}
    </div>
  );
};

export default MessageContent;
