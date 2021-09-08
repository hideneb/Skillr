import React from "react";
import classNames from "classnames";

import styles from "./Banner.module.css";

import hatIcon from "../../../public/icons/icon-hat.svg";
import speechIcon from "../../../public/icons/icon-speach-bubble.svg";
import bikeIcon from "../../../public/icons/icon-bike.svg";
import appleIcon from "../../../public/icons/icon-apple.svg";
import dramaIcon from "../../../public/icons/icon-drama.svg";
import muscleIcon from "../../../public/icons/icon-muscle.svg";
import yogaIcon from "../../../public/icons/icon-yoga.svg";

export default function BannerSection() {
  return (
    <>
      <h2 className={styles.prosPocket}>Pros in your pocket</h2>

      <div className={classNames("desktop")}>
        <p className={styles.textCenter}>
          Help you stay healthy, learn the latest TikTok dance, fix a squeaky
          cabinet, cook a decadent dessert or whatever you want help with, we
          got you. In just one click, you can get face time with someone who’s
          mastered the skill you’re looking to learn. Skillrs are vetted and
          approved, so you can learn from the best.{" "}
          <span className={classNames(styles.fontBold, styles.inlineBlock)}>
            Be impressed. Become impressive.
          </span>
        </p>

        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <img src={hatIcon.src} alt="hat" className={styles.iconItem} />
            <img
              src={speechIcon.src}
              alt="speech"
              className={styles.iconItem}
            />
            <img src={bikeIcon.src} alt="bike" className={styles.iconItem} />
            <img src={appleIcon.src} alt="apple" className={styles.iconItem} />
            <img src={dramaIcon.src} alt="drama" className={styles.iconItem} />
            <img
              src={muscleIcon.src}
              alt="muscle"
              className={styles.iconItem}
            />
            <img src={yogaIcon.src} alt="yoga" className={styles.iconItem} />
          </div>
        </div>
      </div>

      <div className={classNames("tablet", styles.textCenter)}>
        <div className={styles.pocketItem}>
          <img src={yogaIcon.src} alt="yoga" />
          <div className={styles.pocketDescription}>
            <p>
              Help you stay healthy, learn the latest TikTok dance, fix a
              squeaky cabinet, cook a decadent dessert or whatever you want help
              with, we got you.
            </p>
          </div>
        </div>

        <div className={styles.pocketItem}>
          <img src={hatIcon.src} alt="hat" />
          <div className={styles.pocketDescription}>
            <p>
              In just one click, you can get face time with someone who’s
              mastered the skill you’re looking to learn.{" "}
            </p>
          </div>
        </div>

        <div className={styles.pocketItem}>
          <img src={appleIcon.src} alt="apple" />
          <div className={styles.pocketDescription}>
            <p>
              Skillrs are vetted and approved, so you can learn from the best.{" "}
              <span className={classNames(styles.fontBold, styles.inlineBlock)}>
                Be impressed. Become impressive.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
