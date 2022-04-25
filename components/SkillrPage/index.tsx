import React from "react";
import styles from "./styles/SkillerPage.module.css";
import SocialBar from "./SocialBar";
import ProfileCard from "./ProfileCard";
import BookSessionCard from "./BookSessionCard";
import { SkillrDto } from "../../api/v1/types";
import Availability from "./Availability";

type SkillrProfileProps = {
  skillr: SkillrDto;
};

const SkillrPage: React.FC<SkillrProfileProps> = ({ skillr }) => {
  const {
    username,
    displayName,
    profileImage,
    about,
    instagram,
    linkedin,
    skills,
    localAvailability,
  } = skillr;
  return (
    <div>
      <div className={styles.header}></div>
      <div className={styles.container}>
        <div className={styles.colLeft}>
          <ProfileCard
            avatar={profileImage}
            about={about}
            username={username}
            displayName={displayName}
          />
        </div>
        <div className={styles.colRight}>
          <SocialBar
            username={username}
            displayName={displayName}
            instagram={instagram}
            linkedin={linkedin}
          />

          {skills.map((s) => {
            const { lightIcon, name, description } = s.skill;
            const { ratePerMinute } = s;

            return (
              <BookSessionCard
                key={name}
                imgSrc={lightIcon}
                name={name}
                description={description}
                ratePerMinute={ratePerMinute}
                availability={localAvailability}
              />
            );
          })}
        </div>
        <div className={styles.mobileAvailability}>
          {localAvailability && (
            <Availability availability={localAvailability} />
          )}
          <button className={styles.connectNowButton}>Connect Now</button>
        </div>
      </div>
    </div>
  );
};

export default SkillrPage;
