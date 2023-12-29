import styles from "../styles/Common/Modal.module.css";
import Logo from "./Logo.jsx";
import Button from "./BaseComponents/Button";
import { forwardRef, useEffect, useState } from "react";

const SignUpModal = forwardRef((props, ref) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [isError, setIsError] = useState(true);
  const closeModal = () => {
    ref.current.close();
    setEmailInput("");
    setIsError(false);
    setPasswordInput("");
    setConfirmPasswordInput("");
    setEmailInput("");
    setUsernameInput("");

    clearError(document.getElementById("signup-modal-password"));
    clearError(document.getElementById("signup-modal-username"));
    clearError(document.getElementById("signup-modal-email"));
  };

  const onEmailChange = (e) => {
    setEmailInput(e.target.value);
    clearError(document.getElementById("signup-modal-email"));
  };
  const setError = (errorMessage, element) => {
    const p = document.getElementById("signup-modal-error");
    p.innerText = errorMessage;
    if (element) {
      element.classList.add(styles.inputError);
    }
    setIsError(true);
  };
  const clearError = (element) => {
    setIsError(false);
    const p = document.getElementById("signup-modal-error");
    p.innerText = "";
    if (element) {
      element.classList.remove(styles.inputError);
    }
  };
  useEffect(() => {
    let timeout;
    if (passwordInput !== confirmPasswordInput) {
      timeout = setTimeout(() => setError("Passwords don't match"), 500);
    } else {
      clearError(document.getElementById("signup-modal-password"));
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [confirmPasswordInput, passwordInput]);
  const onPasswordChange = (e) => {
    setPasswordInput(e.target.value);
    clearError(document.getElementById("signup-modal-password"));
  };

  const onUsernameChange = (e) => {
    setUsernameInput(e.target.value);
    clearError(document.getElementById("signup-modal-username"));
  };
  const onConfirmPasswordChange = (e) => {
    setConfirmPasswordInput(e.target.value);
    clearError(document.getElementById("signup-modal-password"));
  };
  const signUpFormHandler = async (e) => {
    e.preventDefault();
    if (!isError) {
      const payload = {
        username: usernameInput,
        password: passwordInput,
        email: emailInput,
      };
      const response = await fetch(`${import.meta.env.VITE_REST_API}/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.status === 409) {
        const element = document.getElementById("signup-modal-username");
        setError(await response.text(), element);
        return;
      }
      if (response.status === 400) {
        setError(await response.text());
      }
      if (response.status === 500) {
        setError(await response.text());
      }
    }
  };
  return (
    <dialog onClose={closeModal} className={styles.modal} ref={ref} autoFocus>
      <h3>
        <Logo></Logo>
      </h3>
      <form onSubmit={signUpFormHandler} method="dialog">
        <label>Email</label>
        <input
          id="signup-modal-email"
          onChange={onEmailChange}
          value={emailInput}
          type="email"
        />
        <label>Username</label>
        <input
          id="signup-modal-username"
          onChange={onUsernameChange}
          value={usernameInput}
          type="text"
        />
        <label>Password</label>
        <input
          onChange={onPasswordChange}
          value={passwordInput}
          type="password"
        />
        <label>Confirm Password</label>
        <input
          onChange={onConfirmPasswordChange}
          value={confirmPasswordInput}
          type="password"
          id="signup-modal-password"
        />
        <p id="signup-modal-error" className={styles.errorText}></p>
        <Button type="submit" size="md" buttonType="primary">
          Sign Up
        </Button>
        <Button onClick={closeModal} size="md" buttonType="secondary">
          Close
        </Button>
      </form>
    </dialog>
  );
});

export default SignUpModal;
