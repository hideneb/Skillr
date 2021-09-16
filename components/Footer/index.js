import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Footer.module.css";

import logoTextBlackIcon from "../../public/logo-black-text.svg";

const Footer = () => {
  const { query } = useRouter();
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.logo}>
          <img src={logoTextBlackIcon.src} alt="" />
          <p className={styles.copyright}>© 2021 Skillr, Inc.</p>
        </div>

        <div className={styles.navbarBox}>
          <div className={styles.navbar}>
            <div className={styles.link}>
              <Link href={{ pathname: "/", query }} scroll={false}>
                Home
              </Link>
            </div>
            <div className={styles.link}>
              <Link href={{ pathname: "/become-skillr", query }} scroll={false}>
                Become a Skillr
              </Link>
            </div>
            <div className={styles.link}>
              <Link href={{ pathname: "/about-us", query }} scroll={false}>
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
