import React from "react";
import Image from "next/image";
import styles from "../../styles/SuccessPage.module.css";
import logoTextBlackIcon from "../../public/logo-black-text.svg";

const SuccessPage = () => {
  return (
    <div className={styles.SuccessPage}>
      <div>
        <Image src={logoTextBlackIcon} alt="Logo" />
        <h1 className={styles.Heading}>You&apos;re on the list.</h1>
        <p>Check your email to confirm in a few minutes.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
