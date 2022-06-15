import React from "react";
import styles from "./SkillerPage.module.css";
import ProfileHeader from "../UI/ProfileHeader";
import ProfileCard from "../UI/ProfileCard";
import Availability from "../UI/Availability";
import { SkillrDto } from "../../lib/types/skillr";
import { UserDto } from "../../lib/types/user";
import Router from "next/router";

type SkillrProfileProps = {
	skillr: SkillrDto;
	user: UserDto | null;
};

const SkillrPage: React.FC<SkillrProfileProps> = ({ skillr, user }) => {
	const {
		username,
		displayName,
		profileImage,
		instagram,
		linkedin,
		twitter,
		tiktok,
		skills,
		localAvailability,
	} = skillr;

	const s = skills[0];
	const { lightIcon, name, description } = s.skill;
	const { ratePerMinute } = s;

	return (
		<div>
			<div className={styles.header}></div>
			<div className={styles.container}>
				<ProfileHeader
					username={username}
					displayName={displayName}
					profileImage={profileImage}
					instagram={instagram}
					linkedin={linkedin}
					twitter={twitter}
					tiktok={tiktok}
				/>
				<div className={styles.skillContainer}>
					<div className={styles.colLeft}>
						<ProfileCard
							key={name}
							imgSrc={lightIcon}
							name={name}
							description={description}
							ratePerMinute={ratePerMinute}
							skillr={skillr}
							user={user}
						/>
					</div>
					<div className={styles.colRight}>
						<div className={styles.availability}>
							{localAvailability && <Availability availability={localAvailability} />}
							<button
								className={styles.connectNowButton}
								onClick={() =>
									Router.push(`/skillrs/${skillr.id}/skills/${skillr.skills[0].skillId}`)
								}
							>
								Connect Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkillrPage;
