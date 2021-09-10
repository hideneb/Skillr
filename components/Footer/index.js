import React from "react";
import Link from "next/link";

import styles from "./Footer.module.css";

import logoTextBlackIcon from "../../public/logo-black-text.svg";

const Footer = () => (
  <footer className={styles.footer}>
    <div>
      <div className={styles.logo}>
        <img src={logoTextBlackIcon.src} alt="" />
        <p className={styles.copyright}>© 2021 Skillr, Inc.</p>
      </div>

      <div className={styles.navbarBox}>
        <div className={styles.navbar}>
          <div className={styles.link}>
            <Link href="/">Home</Link>
          </div>
          <div className={styles.link}>
            <Link href="/become-skillr">Become a Skillr</Link>
          </div>
          <div className={styles.link}>
            <Link href="/about-us">About Us</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
