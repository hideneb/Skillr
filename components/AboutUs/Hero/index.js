import React from "react";
import classNames from "classnames";
import screenImage from "../../../public/about-us-screen1.png";
import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" passHref>
            <img src="/logo.svg" alt="Skillr Logo" />
          </Link>
          <h1>Meet Skillr</h1>
          <p className={styles.fontBold}>
            One-to-one skill sharing anytime, anywhere (cause you got things to
            do). An app where makers, masters, scholars and students of life
            rendezvous.
          </p>
          <p className={classNames("desktop", styles.fontBold)}>
            A kickass community to help you learn, problem-solve or be
            entertained. Yeah, we are all that.
          </p>
          <p
            className={classNames("desktop", styles.fontBold)}
            style={{ marginTop: "33px" }}
          >
            Skillr is the easiest way to connect and learn from professionals on
            your own schedule.
          </p>
        </div>
        <div className={styles.right}>
          <div className={classNames("mobileFrame", styles.frame)}>
            <img src={screenImage.src} alt="Screen" />
          </div>
          <p className={classNames("tablet", styles.fontBold)}>
            A kickass community to help you learn, problem-solve or be
            entertained. Yeah, we are all that. Skillr is the easiest way to
            connect and learn from professionals on your own schedule.
          </p>
        </div>
      </div>
    </div>
  );
}
