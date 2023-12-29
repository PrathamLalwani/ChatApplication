import { IoLogoWechat } from "react-icons/io5";
import styles from "../styles/Common/Logo.module.css";

const Logo = ({ className }) => {
  return (
    <div className={`${styles.logo} ${className}`}>
      <IoLogoWechat className={styles.logoIcon} />{" "}
      <span className={styles.logoText}>QuikChat</span>
    </div>
  );
};
export default Logo;
