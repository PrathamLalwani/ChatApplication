import styles from "../styles/Login.module.css";
import React from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { API, REGEX, paths } from "../constants/names";
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
    const value = REGEX.username.exec(username);

    if (value === null) {
      // show error here
    } else {
      fetch(`${API.server}${API.user}/${username}`)
        .then((res) => {
          navigate(paths.chat_path, { replace: true, state: { username } });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.homePageTextContainer}>
        <div className={styles.homePageText}>ChatZone</div>
      </div>
      <div className={styles.container}>
        <CustomInput
          hint={"Enter your Username"}
          onChange={onChangeUsername}
          onKeyDown={onKeyDown}
          value={username}
          onButtonClick={onSendButtonClick}
        />
      </div>
    </div>
  );
};

export default Login;
