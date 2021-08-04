import React from "react";
import styles from "../../styles/SuccessPage.module.css";
import logoTextBlackIcon from "../../public/logo-black-text.svg";

const SuccessPage = () => {
  return (
    <div className={styles.SuccessPage}>
      <div>
        <img src={logoTextBlackIcon.src} alt="Logo" />
        <h1 className={styles.Heading}>You&apos;re on the list.</h1>
        <p>Check your email to confirm in a few minutes.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
