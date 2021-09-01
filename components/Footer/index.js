import React from "react";
import styles from "./Footer.module.css";

// import facebookIcon from "../../public/social-facebook.svg";
// import instagramIcon from "../../public/social-instagram.svg";
// import linkedinIcon from "../../public/social-linkedin.svg";
import logoIcon from "../../public/skillr-logomark-sm.svg";
import logoTextBlackIcon from "../../public/logo-black-text.svg";

const Footer = () => (
  <footer className={styles.footer}>
    {/* <div className={styles.links}>
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
          <img src={instagramIcon.src} alt="Instagram" />
          <span>Instagram</span>
        </a>
        <a href="#">
          <img src={facebookIcon.src} alt="Facebook" />
          <span>Facebook</span>
        </a>
        <a href="#">
          <img src={linkedinIcon.src} alt="LinkedIn" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
    <div className={styles.socialsMobile}>
      <a href="#">
        <img src={instagramIcon.src} alt="Instagram" />
      </a>
      <a href="#">
        <img src={facebookIcon.src} alt="Facebook" />
      </a>
      <a href="#">
        <img src={linkedinIcon.src} alt="LinkedIn" />
      </a>
    </div> */}

    <div className={styles.copyright}>
      <div className={styles.desktop}>
        <img src={logoIcon.src} alt="Logo" />
      </div>
      <div className={styles.mobile}>
        <img src={logoTextBlackIcon.src} alt="Logo" />
      </div>
      <div className={styles.copyrightText}>&copy; 2021 Skillr</div>
    </div>
  </footer>
);

export default Footer;
