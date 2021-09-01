import React from "react";
import classNames from "classnames";

import styles from "./Section.module.css";

export default function Section({ image, altText, title, description, flip }) {
  return (
    <div className={classNames(styles.section, { [styles.flip]: flip })}>
      <div className={styles.section__left}>
        <div>
          <h2>{title}</h2>
          <div className="desktop">{description}</div>
        </div>
      </div>
      <div className={styles.section__right}>
        <div className={styles.mobileFrame}>
          <img src={image} alt={altText} />
        </div>
        <div className="tablet">{description}</div>
      </div>
    </div>
  );
}
