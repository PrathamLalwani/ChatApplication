import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { API, paths } from "../constants/names";
import { useUser } from "../context/UsernameContext";
import styles from "../styles/Chat.module.css";
import RoomList from "../components/RoomList";
import ConversationList from "../components/ConversationList";
import Conversation from "../components/Conversation";
import { SocketProvider } from "../context/SocketContext";

// const groupConversations = {
//   General: {
//     conversationId: 0,
//     conversationName: "General",
//     isPersonal: false,

//     messages: [
//       {
//         username: "Sahib",
//         message: "Hello",
//         conversationName: "General",
//         isPersonal: false,
//       },
//       {
//         username: "Pratham",
//         message: "Hi",
//         conversationName: "General",
//         isPersonal: false,
//       },
//       {
//         username: "Sahib",
//         message: "How are you?",
//         conversationName: "General",
//         isPersonal: false,
//       },
//       {
//         username: "Pratham",
//         message: "I am fine",
//         conversationName: "General",
//         isPersonal: false,
//       },
//       {
//         username: "Sahib",
//         message: "How is your day going?",
//         conversationName: "General",
//         isPersonal: false,
//       },
//       {
//         username: "Pratham",
//         message: "It is going great",
//         conversationName: "General",
//         isPersonal: false,
//       },
//     ],
//   },
//   Random: {
//     conversationId: 1,
//     conversationName: "Random",
//     isPersonal: false,
//     messages: [
//       {
//         username: "Sahib",
//         message: "randoms",
//         conversationName: "Random",
//       },
//       {
//         username: "Pratham",
//         message: "test",
//         conversationName: "Random",
//       },
//       {
//         username: "Sahib",
//         message: "randoms",
//         conversationName: "Random",
//       },
//       {
//         username: "Pratham",
//         message: "test",
//         conversationName: "Random",
//       },
//       {
//         username: "Sahib",
//         message: "randoms",
//         conversationName: "Random",
//       },
//     ],
//   },
// };

const Chat = () => {
  const usernameContext = useUser();
  const username = usernameContext.username;
  const [pmSelected, setPMSelected] = useState(true);
  const [currentMessages, setCurrentMessages] = useState([]);
  const navigate = useNavigate();
  const [conversationList, setConversationList] = useState([]);
  const [currentConversation, setCurrentConversation] = useState("");
  const personalConversations = useRef({});
  const groupConversations = useRef({});
  const onMenuSelect = (e) => {
    const pmSelected =
      e.currentTarget.getAttribute("title") === "Personal Messages";
    setPMSelected(pmSelected);
    // update messages using updateMessages function.
  };

  const onAddUser = (user) => {
    if (pmSelected) {
      let maxConversationId = 0;
      for (const key in personalConversations.current) {
        if (Object.hasOwnProperty.call(personalConversations.current, key)) {
          const element = personalConversations.current[key];
          maxConversationId = Math.max(
            maxConversationId,
            element.conversationId
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
            element.conversationId
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
        ]
      );
    } else {
      setConversationList(groupConversations.current);
      onConversationSelect(undefined);
    }
  }, [pmSelected]);

  useEffect(() => {
    console.log(username);
    if (username == null) return;
    console.log(`${API.server}private-chat/${username}`);
    fetch(`${API.server}private-chat/${username}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        personalConversations.current = data;
        setConversationList(personalConversations.current);
      })
      .catch((err) => {
        console.log(err);
      });
    // fetch(`${API.server}group-chat/${username}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [username]);

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

  return (
    <SocketProvider username={username}>
      <div className={styles.main}>
        <div className={styles.sideBar}>
          <RoomList onMenuSelect={onMenuSelect} pmSelected={pmSelected} />
          <ConversationList
            conversationList={conversationList}
            selectedConversation={currentConversation}
            onConversationSelect={onConversationSelect}
            pmSelected={pmSelected}
            onAddUser={onAddUser}
          />
        </div>
        <Conversation
          messages={currentMessages}
          addMessage={addMessage}
          pmSelected={pmSelected}
          conversationName={currentConversation}
        />
      </div>
    </SocketProvider>
  );
};

export default Chat;
