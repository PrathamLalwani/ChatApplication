import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { API, paths } from "../constants/names";
import { useUser } from "../context/UsernameContext";
import styles from "../styles/Chat/Chat.module.css";
import { SocketProvider } from "../context/SocketContext";
import Sidebar from "../components/Sidebar";
import MessageContent from "../components/MessageContent";
import Memberbar from "../components/Memberbar";

const Chat = () => {
  const usernameContext = useUser();
  const username = usernameContext.username;
  const [pmSelected, setPMSelected] = useState(true);
  const [currentMessages, setCurrentMessages] = useState([]);
  const navigate = useNavigate();
  const [conversationList, setConversationList] = useState({});
  const [currentConversation, setCurrentConversation] = useState("");
  const personalConversations = useRef({});
  const groupConversations = useRef({});
  const [sideBarClosed, setSideBarClosed] = useState(false);
  const [memberBarClosed, setMemberBarClosed] = useState(false);

  const onChatSelect = (pmSelect) => {
    setPMSelected(pmSelect);
    // update messages using updateMessages function.
  };

  const onAddChat = (user) => {
    if (pmSelected) {
      let maxConversationId = 0;
      for (const key in personalConversations.current) {
        if (Object.hasOwnProperty.call(personalConversations.current, key)) {
          const element = personalConversations.current[key];
          maxConversationId = Math.max(
            maxConversationId,
            element.conversationId,
          );
        }
      }
      user.conversationId = maxConversationId + 1;
      personalConversations.current[user.conversationName] = user;
      setConversationList(personalConversations.current);
    } else if (!pmSelected) {
      let maxConversationId = 0;
      for (const key in groupConversations) {
        if (Object.hasOwnProperty.call(groupConversations, key)) {
          const element = groupConversations[key];
          maxConversationId = Math.max(
            maxConversationId,
            element.conversationId,
          );
        }
      }
    }
  };

  useEffect(() => {
    if (pmSelected) {
      setConversationList(personalConversations.current);
      onConversationSelect(
        personalConversations.current[
          Object.keys(personalConversations.current)[0]
        ],
      );
    } else {
      setConversationList(groupConversations.current);
      onConversationSelect(
        groupConversations.current[Object.keys(groupConversations.current)[0]],
      );
    }
  }, [pmSelected]);

  useEffect(() => {
    if (username == null) return;

    fetch(`${API.server}private-chat/${username}`)
      .then((res) => res.json())
      .then((data) => {
        personalConversations.current = data;
        setConversationList(personalConversations.current);
        if (Object.keys(personalConversations.current).length > 0) {
          onConversationSelect(
            personalConversations.current[
              Object.keys(personalConversations.current)[0]
            ],
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`${API.server}group-chat/${username}`)
      .then((res) => res.json())
      .then((data) => {
        groupConversations.current = data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username, navigate]);

  const onConversationSelect = (element) => {
    if (element === undefined) {
      setCurrentConversation("");
      setCurrentMessages([]);
      return;
    }
    setCurrentConversation(element.conversationName);
    setCurrentMessages([...element.messages]);
  };

  const addMessage = (message) => {
    setCurrentMessages((prev_messages) => {
      conversationList[currentConversation].messages.push(message);
      return [...prev_messages, message];
    });
  };

  useEffect(() => {
    if (username == null) {
      navigate(paths.login_path, {
        replace: true,
      });
    }

    // console.log(currentConversation, conversationList);
  }, [username, navigate]);

  const onMenuBtnClick = () => {
    setSideBarClosed((value) => !value);
  };

  const onAccountBtnClick = () => {
    setMemberBarClosed((value) => !value);
  };

  return (
    <SocketProvider username={username}>
      <div className={styles.main}>
        <Sidebar
          onChatSelect={onChatSelect}
          pmSelected={pmSelected}
          conversationList={conversationList}
          currentConversation={currentConversation}
          onAddChat={onAddChat}
          onConversationSelect={onConversationSelect}
          isSideBarClosed={sideBarClosed}
        />
        <MessageContent
          addMessage={addMessage}
          currentConversation={currentConversation}
          currentMessages={currentMessages}
          onAccountBtnClick={onAccountBtnClick}
          onMenuBtnClick={onMenuBtnClick}
          pmSelected={pmSelected}
        />
        <Memberbar
          username={username}
          list={
            currentConversation !== null &&
            conversationList.hasOwnProperty(currentConversation)
              ? conversationList[currentConversation].members
              : []
          }
          pmSelected={pmSelected}
        />
      </div>
    </SocketProvider>
  );
};

export default Chat;
