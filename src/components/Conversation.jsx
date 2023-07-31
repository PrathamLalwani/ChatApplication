import React, { useState, useCallback, useEffect } from "react";
import { useUser } from "../context/UsernameContext";
import { useSocket } from "../context/SocketContext.js";
import { IoIosSend } from "react-icons/io";
import styles from "./../styles/Conversation.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatElement from "./ChatElement";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import Space from "./Space";
// import { useNavigate } from "react-router-dom";

const Conversation = ({
  messages,
  addMessage,
  pmSelected,
  conversationName,
}) => {
  const usernameContext = useUser();
  const username = usernameContext.username;
  const socket = useSocket();
  const [message, setMessage] = useState("");

  const onChangeInputText = (e) => {
    setMessage(e.target.value);
  };

  const onSendMessage = (e) => {
    if (message) {
      addMessage({
        username: username,
        message: message,
      });
      socket.emit("send-message", {
        message: message,
        username: username,
        isPersonal: pmSelected,
        conversationName: conversationName,
        time: Date.now().toString(),
      });
      setMessage("");
    }
  };

  const onReceiveMessage = useCallback(
    (message) => {
      addMessage(message);
    },
    [addMessage]
  );
  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", onReceiveMessage);
    return () => socket.off("receive-message");
  }, [socket, onReceiveMessage]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") onSendMessage();
  };

  //   const updateScroll = () => {
  //     // scrollbars.current.scrollToBottom();
  //   };

  return (
    <div className={styles.container}>
      <div className={styles.scroll}>
        <InfiniteScroll dataLength={messages.length} hasMore={false}>
          {messages.map((element, index) => {
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
      <div className={styles.textbox}>
        <CustomInput
          onChange={onChangeInputText}
          onKeyDown={onKeyDown}
          width={"90%"}
          hint={`Message ${conversationName}`}
          value={message}
          multiple={true}
          maxLen={1024}
          minLen={1}
        />
        <Space width={"10px"} />
        <CustomButton
          className={styles.sendButton}
          onClick={onSendMessage}
          children={<IoIosSend size={22} />}
        />
      </div>
    </div>
  );
};

export default Conversation;
