import styles from "../styles/Login/Login.module.css";
import commonStyles from "../styles/Common/Common.module.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { API, REGEX, paths } from "../constants/names";
import { useUser } from "../context/UsernameContext";
import { IoLogoWechat } from "react-icons/io5";
import Success from "../components/Success";

const Login = () => {
  const delay = 3000;
  const pathArr = useMemo(
    () => ["red", "blue", "yellow", "black", "orange"],
    []
  );
  const { username, setUsername } = useUser();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === pathArr.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, pathArr]);

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
      <div className={styles.information}>
        {/* logo of the project */}
        <div className={styles.logo}>
          <IoLogoWechat className={styles.logoIcon} />
          <p className={`${styles.logoText}`}>QuickChat</p>
        </div>

        {/* statement */}
        <div className={styles.statement}>
          <span className={styles.statementColored}>
            Instant Connection, Effortless Communication.
          </span>
        </div>

        {/* container for the text input */}
        <CustomInput
          hint={"Enter your Username"}
          containerClassName={styles.inputContainer}
          onChange={onChangeUsername}
          onKeyDown={onKeyDown}
          value={username}
          onButtonClick={onSendButtonClick}
        />
      </div>
      {/* <Success /> */}
      {/* This div contains the slideshow of different images describing the project */}
      <div className={styles.slideshow}>
        <div className={styles.list}>
          <div
            className={styles.element}
            style={{
              backgroundColor: pathArr[currentIndex],
            }}
          >
            Put your images here
          </div>
        </div>
        <div className={styles.navigator}>
          {pathArr.map((value, index) => {
            return (
              <div
                className={`${
                  currentIndex === index ? styles.currCircle : styles.circle
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Login;
