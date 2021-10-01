import React from "react";
import styles from "./Bio.module.css";
import classNames from "classnames";

export default function Bio({ size, isHover, img, name, skill, body }) {
  return (
    <div
      className={classNames(
        styles.bioContainer,
        size == "big" ? styles.bigBio : styles.smallBio,
        isHover && styles.isHover
      )}
    >
      <div className={classNames(styles.relative, styles.bioImg)}>
        <img src={img} alt={name} />
        <div className={classNames(styles.absolute, styles.bioDetail)}>
          <p className={styles.bioName}>{name}</p>
          <p className={styles.bioSkill}>{skill}</p>
        </div>
      </div>
      <div
        className={classNames(styles.bioContent, isHover && styles.absolute)}
      >
        <p className={styles.bioBody}>{body}</p>
      </div>
    </div>
  );
}
