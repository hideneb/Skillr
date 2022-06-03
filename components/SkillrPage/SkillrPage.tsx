import React from "react";
import styles from "./SkillerPage.module.css";
import SocialBar from "../UI/SocialBar";
import ProfileCard from "../UI/ProfileCard";
import BookSessionCard from "../UI/BookSessionCard";
import Availability from "../UI/Availability";
import { SkillrDto } from "../../lib/types/skillr";
import { UserDto } from "../../lib/types/user";

type SkillrProfileProps = {
  skillr: SkillrDto;
  user: UserDto | null;
};

const SkillrPage: React.FC<SkillrProfileProps> = ({ skillr, user }) => {
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
                skillr={skillr}
                availability={localAvailability}
                user={user}
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
