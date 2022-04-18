import styles from "./styles/components/SocialBar.module.css";
import instagramIcon from "../../public/social-instagram-black-border.svg";
import linkedinIcon from "../../public/vector.svg";
// import YourSvg from "../../public/social-instagram.svg";
// import { ReactComponent as YourSvg } from "./instagramIcon.svg";

const SocialBar = ({ username, displayName, linkedin, instagram }) => {
	return (
		<div className={styles.socialBar}>
			<h2 className={styles.username}>@{username}</h2>
			<div className="d-flex">
				<h1 className={styles.displayName}>{displayName} </h1>
				<div className={styles.socialLinksContainer}>
					<a href={instagram} className="d-flex">
						<img src={instagramIcon.src} alt="yoga" className={styles.iconItem} />
						<div>Instagram</div>
					</a>
					<a href={linkedin} className="d-flex">
						<img src={linkedinIcon.src} alt="yoga" className={styles.iconItem} />
						<div>LinkedIn</div>
					</a>

				</div>
			</div>
		</div>
	);
};

export default SocialBar;
