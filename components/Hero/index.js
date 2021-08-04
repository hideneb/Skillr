import React from "react";
import styles from "./Hero.module.css";
import screensImage from "../../public/hero-screens.png";
import screensMobileImage from "../../public/hero-mobile.png";

const Hero = () => (
  <div className={styles.container}>
    <div>
      <img src="/logo.svg" width={73} height={102} alt="Skillr Logo" />
      <h1 className={styles.title}>Professional Help At Your Fingertips</h1>
      <div className={styles.screens}>
        <div className={styles.screensDesktop}>
          <img src={screensImage.src} layout="fixed" alt="Skillr screens" />
        </div>
        <div className={styles.screensMobile}>
          <img src={screensMobileImage.src} layout="fixed" alt="Skillr screens" />
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
