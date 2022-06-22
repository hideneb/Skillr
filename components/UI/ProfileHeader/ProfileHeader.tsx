import styles from "./ProfileHeader.module.css";
import InstagramIcon from "../../../public/social-instagram-black-border.svg";
import LinkedinIcon from "../../../public/linkedin.svg";
import TwitterIcon from "../../../public/twitter.svg";
import TikTokIcon from "../../../public/tiktok.svg";
import AppStore from "../AppStore";
import classNames from "classnames";

type ProfileHeaderProps = {
	profileImage: string;
	username: string;
	displayName: string;
	linkedin?: string;
	instagram?: string;
	twitter?: string;
	tiktok?: string;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
	profileImage,
	username,
	displayName,
	linkedin,
	instagram,
	twitter,
	tiktok,
}) => {
	return (
		<div className={styles.profileHeader}>
			<div className={styles.colLeft}>
				<div className={styles.profileImageContainer}>
					{profileImage ? <img height={"100%"} width={"100%"} alt="" src={profileImage} /> : null}
				</div>
				<div className={styles.profileInfo}>
					<div className={styles.username}>@{username}</div>
					<div
						className={classNames(styles.displayName, {
							[styles.displayNameLong]: displayName.length > 25,
						})}
					>
						{displayName}
					</div>
					<div className={styles.socialLinksContainer}>
						<a href={instagram} className="d-flex">
							<InstagramIcon className={styles.socialIcon} />
						</a>
						<a href={linkedin} className="d-flex">
							<LinkedinIcon className={styles.socialIcon} />
						</a>
						<a href={twitter} className="d-flex">
							<TwitterIcon className={styles.socialIcon} />
						</a>
						<a href={tiktok} className="d-flex">
							<TikTokIcon className={styles.socialIcon} />
						</a>
					</div>
				</div>
			</div>
			<div className={styles.colRight}>
				<AppStore />
			</div>
		</div>
	);
};

export default ProfileHeader;
