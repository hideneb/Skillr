import styles from "./ProfileCard.module.css";
import cx from "classnames";
import React, { useState } from "react";

type SkillrProfileCardProps = {
  username: string;
  displayName: string;
  avatar: string;
  about: string;
};

const Card: React.FC<SkillrProfileCardProps> = ({
  username,
  displayName,
  avatar,
  about,
}) => {
  const [showFullBio, setShowFullBio] = useState(false);

  const blurb = about?.length > 500 ? `${about.substring(0, 500)}...` : about;

  return (
    <div className={styles.profileCard}>
      <div className={cx(styles.profileCardContent, styles.card)}>
        <div className={styles.profileCardImageContainer}>
          {avatar ? (
            <img height={"100%"} width={"100%"} alt="" src={avatar} />
          ) : null}
        </div>

        <div className={styles.mobileProfileHeader}>
          <div>@{username}</div>
          <div>{displayName}</div>
        </div>
        <p className={styles.profileCardAbout}>{showFullBio ? about : blurb}</p>
        {!showFullBio && (
          <button
            className={styles.readMoreButton}
            onClick={() => setShowFullBio(true)}
          >
            Read more
          </button>
        )}
        {showFullBio && (
          <button
            className={styles.readLessButton}
            onClick={() => setShowFullBio(false)}
          >
            Read less
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
