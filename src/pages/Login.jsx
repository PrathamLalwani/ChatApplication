import styles from "../styles/Login/Login.module.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { API, REGEX, paths } from "../constants/names";
import { useUser } from "../context/UsernameContext";
import { IoLogoWechat } from "react-icons/io5";

const Login = () => {
  const { username, setUsername } = useUser();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

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
    <body>
      <nav className={styles.navigation}>
        <ul>
          <li>Login</li>
          <li>Sign Up</li>
        </ul>
        <div>Logo</div>
      </nav>
    </body>
  );
};

export default Login;
