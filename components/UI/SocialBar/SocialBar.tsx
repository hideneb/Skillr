import styles from "./SocialBar.module.css";
import InstagramIcon from "../../../public/social-instagram-black-border.svg";
import LinkedinIcon from "../../../public/vector.svg";

type SocialBarProps = {
  username: string;
  displayName?: string;
  linkedin?: string;
  instagram?: string;
};

const SocialBar: React.FC<SocialBarProps> = ({
  username,
  displayName,
  linkedin,
  instagram,
}) => {
  return (
    <div className={styles.socialBar}>
      <h2 className={styles.username}>@{username}</h2>
      <div className="d-flex">
        <h1 className={styles.displayName}>{displayName} </h1>
        <div className={styles.socialLinksContainer}>
          <a href={instagram} className="d-flex">
            <InstagramIcon className={styles.socialIcon} />
            <div>Instagram</div>
          </a>
          <a href={linkedin} className="d-flex">
            <LinkedinIcon className={styles.socialIcon} />
            <div>LinkedIn</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialBar;
