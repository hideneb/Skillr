import React from "react";
import styles from "./Bio.module.css";
import classNames from "classnames";

export default function Bio({
  size,
  hoverImg,
  isHover,
  img,
  name,
  skill,
  body,
}) {
  return (
    <div
      className={classNames(
        styles.bioContainer,
        size == "big"
          ? hoverImg !== undefined
            ? classNames(styles.bigBioHover, styles.bigBio)
            : styles.bigBio
          : styles.smallBio,
        isHover && styles.isHover
      )}
    >
      <div>
        <div className={classNames(styles.relative, styles.bioImg)}>
          <img src={img} alt={name} className={styles.originImg} />
          {hoverImg !== "" && (
            <img
              src={hoverImg}
              alt={name}
              className={classNames(hoverImg !== "" && styles.hoverImg)}
            />
          )}

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
    </div>
  );
}
