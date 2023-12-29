import { forwardRef, useState } from "react";
import styles from "../styles/Common/Modal.module.css";
import Logo from "./Logo.jsx";
import Button from "./BaseComponents/Button";
const LoginModalRef = forwardRef((props, ref) => {
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [isError, setIsError] = useState(true);
  const closeModal = (e) => {
    e.preventDefault();
    ref.current.close();
    setIsError(false);
    setPasswordInput("");
    setUsernameInput("");

    clearError(document.getElementById("login-modal-password"));
    clearError(document.getElementById("login-modal-username"));
  };

  const setError = (errorMessage, element) => {
    const p = document.getElementById("login-modal-error");
    p.innerText = errorMessage;
    if (element) {
      element.classList.add(styles.inputError);
    }
    setIsError(true);
  };
  const clearError = (element) => {
    setIsError(false);
    const p = document.getElementById("login-modal-error");
    p.innerText = "";
    if (element) {
      element.classList.remove(styles.inputError);
    }
  };
  const onPasswordChange = (e) => {
    setPasswordInput(e.target.value);
    clearError(document.getElementById("login-modal-password"));
  };

  const onUsernameChange = (e) => {
    setUsernameInput(e.target.value);
    clearError(document.getElementById("login-modal-username"));
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();
    if (!isError) {
      const payload = {
        username: usernameInput,
        password: passwordInput,
      };
      const response = await fetch(`${import.meta.env.VITE_REST_API}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.status === 401) {
        const userElement = document.getElementById("login-modal-username");
        const errorMessage = await response.text();
        setError(errorMessage, userElement);
        const passwordElement = document.getElementById("login-modal-password");
        setError(errorMessage, passwordElement);
        return;
      }
      if (response.status === 404) {
        const userElement = document.getElementById("login-modal-username");
        setError(await response.text(), userElement);
      }
      if (response.status === 500) {
        setError(await response.text());
      }
      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        props.onLogin();
      }
    }
  };
  return (
    <dialog onClose={closeModal} className={styles.modal} ref={ref} autoFocus>
      <h3>
        <Logo />
      </h3>
      <form onSubmit={loginFormHandler} method="dialog">
        <label>Username</label>
        <input
          value={usernameInput}
          id="login-modal-username"
          onChange={onUsernameChange}
          type="text"
        />
        <label>Password</label>
        <input
          value={passwordInput}
          id="login-modal-password"
          onChange={onPasswordChange}
          type="password"
        />

        <p className={styles.errorText} id="login-modal-error"></p>
        <Button
          type="submit"
          id="login-modal-password"
          size="md"
          buttonType="primary"
        >
          Login
        </Button>
        <Button onClick={closeModal} size="md" buttonType="secondary">
          Close
        </Button>
      </form>
    </dialog>
  );
});
export default LoginModalRef;
