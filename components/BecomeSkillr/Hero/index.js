import React from "react";

import becomeSkillr from "../../../public/become-skillr-screens.png";
import becomeSkillrMobile from "../../../public/become-skillr-mobile.png";
import styles from "./Hero.module.css";
import classNames from "classnames";
import Link from "next/link";

export default function Hero() {
  return (
    <div className={styles.container}>
      <Link href="/" passHref>
        <img src="/logo.svg" alt="Skillr Logo" />
      </Link>
      <div className={styles.contentWrapper}>
        <div className={classNames("desktop", styles.screens)}>
          <div className={styles.screensDesktop}>
            <img src={becomeSkillr.src} layout="fixed" alt="Screen" />
          </div>
          <div className={styles.screensMobile}>
            <img src={becomeSkillrMobile.src} layout="fixed" alt="Screen" />
          </div>
        </div>
        <div>
          <h1 className={styles.title}>
            Share What You&apos;re Good At, Make Money
          </h1>
          <p className={styles.description}>
            Get paid for one-to-one skill-sharing sessions, teaching others what
            you know.
          </p>
        </div>
        <div className={classNames("tablet", styles.screens)}>
          <div className={styles.screensDesktop}>
            <img src={becomeSkillr.src} layout="fixed" alt="Screen" />
          </div>
          <div className={styles.screensMobile}>
            <img src={becomeSkillrMobile.src} layout="fixed" alt="Screen" />
          </div>
        </div>
      </div>
    </div>
  );
}
