import React from "react";
import styles from "./ProfileCard.module.css";
import cx from "classnames";
import { SkillrDto } from "../../../lib/types/skillr";
import { UserDto } from "../../../lib/types/user";
import ProfileVideos from "../ProfileVideos";

type ProfileCardProps = {
	imgSrc: string;
	name: string;
	description: string;
	ratePerMinute: number;
	skillr: SkillrDto;
	user: UserDto | null;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
	imgSrc,
	name,
	description,
	ratePerMinute,
	skillr,
	user,
}) => {
	const videos = skillr.images.filter((i) => !!i.video);

	return (
		<div className={cx(styles.card, styles.profileCardContainer)}>
			<div className="d-flex flex-column" style={{ flex: 1, maxWidth: "100%" }}>
				<p className={styles.profileCardDescription}>
					{
						//todo: this is hard-coded until we have description data
						//description ||
						"Passionate yoga teacher with over 3+ years of professional experience in designing and leading flow and vinyasa yoga classes. In June 2018, completed an Advanced 300-Hour Yoga Teacher Training in Bali, Indonesia, and acquired an in-depth knowledge about postures, breathing techniques, and spiritual elements of yoga teaching.Indonesia, and acquired an in-depth knowledge about postures, breathing techniques, and spiritual elements of yoga teaching. "
					}
				</p>
				<div className="d-flex">
					<div className={styles.profileDetialsCardImgContainer}>
						{imgSrc ? <img height={"100%"} width={"100%"} alt="" src={imgSrc} /> : null}
					</div>
					<div className="d-flex" style={{ flexGrow: 1 }}>
						<div className={styles.profileCardTextContainer}>
							<div className={styles.title}>{name}</div>
							<div className={styles.rateContainer}>
								{ratePerMinute ? (
									<div className={styles.rate}>${(ratePerMinute / 100).toFixed(2)}/min</div>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				</div>
				{videos.length > 0 && (
					<div className={styles.videos}>
						<ProfileVideos videos={videos} />
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfileCard;
