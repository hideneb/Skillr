import React from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

import facebookIcon from "../../public/facebook.png";
import instagramIcon from "../../public/instagram.png";
import linkedinIcon from "../../public/linkedIn.png";
import logoIcon from "../../public/logo-sm.png";
import logoTextBlackIcon from "../../public/logo-black-text.svg";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.links}>
      <div>
        <h4>Resources</h4>
        <a href="#">How it Works</a>
        <a href="#">Help Center</a>
      </div>
      <div>
        <h4>Legal</h4>
        <a href="#">Terms of Service</a>
        <a href="#">Cookies Policy</a>
        <a href="#">Privacy Policy</a>
      </div>
      <div className={styles.socials}>
        <h4>Resources</h4>
        <a href="#">
          <Image src={instagramIcon} alt="Instagram" />
          <span>Instagram</span>
        </a>
        <a href="#">
          <Image src={facebookIcon} alt="Facebook" />
          <span>Facebook</span>
        </a>
        <a href="#">
          <Image src={linkedinIcon} alt="LinkedIn" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
    <div className={styles.socialsMobile}>
      <a href="#">
        <Image src={instagramIcon} alt="Instagram" />
      </a>
      <a href="#">
        <Image src={facebookIcon} alt="Facebook" />
      </a>
      <a href="#">
        <Image src={linkedinIcon} alt="LinkedIn" />
      </a>
    </div>

    <div className={styles.copyright}>
      <div className={styles.desktop}>
        <Image src={logoIcon} alt="Logo" />
      </div>
      <div className={styles.mobile}>
        <Image src={logoTextBlackIcon} alt="Logo" />
      </div>
      <div className={styles.copyrightText}>&copy; 2021 Skillr</div>
    </div>
  </footer>
);

export default Footer;
