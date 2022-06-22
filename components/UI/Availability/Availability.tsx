import React from "react";
import styles from "./Availability.module.css";
import moment from "moment";
import classNames from "classnames";
import { SkillrLocalAvailabilityDto } from "../../../lib/types/skillr";

type AvailabilityProps = {
	availability: SkillrLocalAvailabilityDto;
};

const formatTime = (t: moment.MomentInput) => moment(t, "h:mm:ss a").format("h:mm a");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Availability: React.FC<AvailabilityProps> = ({ availability }) => {
	return (
		<div>
			<div className={styles.title}>Availability</div>
			<div className={styles.info}>Showing times in your local timezone.</div>
			{[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
				const startTime = availability[`day${dayIndex}Begin` as keyof SkillrLocalAvailabilityDto];
				const endTime = availability[`day${dayIndex}End` as keyof SkillrLocalAvailabilityDto];

				return (
					<div
						key={dayIndex}
						className={classNames(styles.dayContainer, {
							[styles.unavailable]: !startTime || !endTime,
						})}
					>
						<div className={styles.day}>{days[dayIndex]}</div>
						<div className={styles.hours}>
							{startTime && endTime
								? `${formatTime(startTime)} - ${formatTime(endTime)}`
								: "I'm not available"}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Availability;
