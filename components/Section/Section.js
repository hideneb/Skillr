import React from "react";
import classNames from "classnames";

import styles from "./Section.module.css";

export default function Section({
  image,
  altText,
  title,
  description,
  flip,
  style,
}) {
  return (
    <div className={styles.wrapper} style={style}>
      <div className={classNames(styles.section, { [styles.flip]: flip })}>
        <div className={styles.section__left}>
          <h2 className={styles.title}>{title}</h2>
          <div className="desktop">{description}</div>
        </div>
        <div className={styles.section__right}>
          <div className={classNames("mobileFrame", styles.frame)}>
            <img src={image} alt={altText} />
          </div>
          <div className="tablet">{description}</div>
        </div>
      </div>
    </div>
  );
}
