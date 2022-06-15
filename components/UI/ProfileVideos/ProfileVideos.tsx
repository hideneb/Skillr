import "react-modal-video/css/modal-video.min.css";
// @ts-ignore: no types available for react-modal-video
const ModalVideo = dynamic(() => import("react-modal-video"), {
	ssr: false,
});
import styles from "./ProfileVideos.module.css";
import { SkillrImageDto } from "../../../lib/types/skillr";
import classNames from "classnames";
import PlayIcon from "../../../public/play.svg";
import { useState } from "react";
import dynamic from "next/dynamic";

type ProfileVideosProps = {
	videos: SkillrImageDto[];
};

const ProfileVideos: React.FC<ProfileVideosProps> = ({ videos }) => {
	const [videoOpen, setVideoOpen] = useState(false);
	const [videoSource, setVideoSource] = useState("");

	const openVideo = (src: string) => {
		setVideoSource(src);
		setVideoOpen(true);
	};

	const closeVideo = () => {
		setVideoSource("");
		setVideoOpen(false);
	};

	return (
		<>
			<div
				className={classNames(styles.profileVideos, {
					[styles.singleVideoLayout]: videos.length === 1,
				})}
			>
				{videos.map((v) => {
					return (
						<div key={v.id} className={styles.result} onClick={() => openVideo(v.video)}>
							<PlayIcon className={styles.play} />
							<img className={styles.video} src={v.image} alt="" />
						</div>
					);
				})}
			</div>
			{typeof window !== "undefined" && (
				<ModalVideo
					channel="custom"
					autoplay
					url={videoSource}
					isOpen={videoOpen}
					onClose={() => closeVideo()}
				/>
			)}
		</>
	);
};

export default ProfileVideos;
