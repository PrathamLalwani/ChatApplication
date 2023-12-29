import styles from "../styles/Login/HomePage.module.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { API, REGEX, paths } from "../constants/names";
import { useUser } from "../context/UsernameContext";
import Button from "../components/BaseComponents/Button";
import HeroImg from "../assets/HomePageBackground.svg?react";
import SelicateImg from "../assets/Selicate.svg?react";
import FlowderImg from "../assets/Flowder.svg?react";
import GilgamitImg from "../assets/Gilgamit.svg?react";
import PlantifyImg from "../assets/Plantify.svg?react";
import DolmosImg from "../assets/Dolmos.svg?react";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import Logo from "../components/Logo";
const HomePage = () => {
  const { username, setUsername } = useUser();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const loginModalRef = useRef(null);
  const signUpModalRef = useRef(null);

  const loginButtonHandler = () => {
    loginModalRef.current.showModal();
  };
  const signUpButtonHandler = () => {
    signUpModalRef.current.showModal();
  };

  const onAuthenticated = () => {
    navigate("/chat");
  };

  return (
    <main className={styles.main}>
      {<LoginModal onLogin={onAuthenticated} ref={loginModalRef} />}
      <SignUpModal ref={signUpModalRef} />
      <nav className={styles.navigation}>
        <Logo />
        <ul className={styles.navButtons}>
          <li>
            <Button onClick={loginButtonHandler} buttonType="primary" size="sm">
              Login
            </Button>
          </li>
          <li>
            <Button
              onClick={signUpButtonHandler}
              buttonType="secondary"
              size="sm"
            >
              Sign Up
            </Button>
          </li>
        </ul>
      </nav>

      <div className={styles.layoutGrid}>
        {" "}
        <section className={styles.heroSection}>
          <div className={styles.heroText}>
            <p>Instant Connection, Effortless Communication</p>
            <p>Where speed meets simplicity</p>
            <p>
              QuickChat makes conversation an effortless exchange, connecting
              you with the world in the blink of an eye.
            </p>
            <Button size="base">Get Started</Button>
          </div>
          <HeroImg className={styles.heroImg} />
        </section>
        <section className={styles.socialProof}>
          <span>Trusted By:</span>
          <div className={styles.socialProofCompanies}>
            <div className={styles.companyImg}>
              <SelicateImg></SelicateImg> <span>Selicate</span>
            </div>
            <div className={styles.companyImg}>
              <FlowderImg></FlowderImg> <span>Flowder</span>
            </div>
            <div className={styles.companyImg}>
              <GilgamitImg></GilgamitImg> <span>Gilgamit</span>
            </div>
            <div className={styles.companyImg}>
              <PlantifyImg></PlantifyImg> <span>Plantify</span>
            </div>
            <div className={styles.companyImg}>
              <DolmosImg></DolmosImg> <span>Dolmos</span>
            </div>
          </div>
        </section>
        <section>
          <div></div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
