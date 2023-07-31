import styles from "../styles/Login.module.css";
import React from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { IoIosSend } from "react-icons/io";
import Space from "../components/Space";
import { useNavigate } from "react-router-dom";
import { API, paths } from "../constants/names";
import { useUser } from "../context/UsernameContext";

const Login = () => {
  const { username, setUsername } = useUser();
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onKeyDown = (e) => {
    // console.log(e.key);
    if (e.key === "Enter") onSendButtonClick();
  };

  const onSendButtonClick = (e) => {
    console.log(`${API.server}${API.user}/${username}`);
    fetch(`${API.server}${API.user}/${username}`)
      .then((res) => {
        navigate(paths.chat_path, { replace: true, state: { username } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.home}>
      <CustomInput
        hint={"enter your username"}
        onChange={onChangeUsername}
        onKeyDown={onKeyDown}
        value={username}
      />
      <Space width={"30px"} />
      <CustomButton
        onClick={onSendButtonClick}
        className={styles.sendButton}
        children={<IoIosSend size={22} />}
      />
    </div>
  );
};

export default Login;
