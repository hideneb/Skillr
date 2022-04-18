import styles from "./SkillerPage.module.css";
import AvatarPlaceholder from "../../public/avatar-placeholder.svg";
import PinkStar from "../../public/PinkStar.svg";

const Review = ({ numStars = 5 }) => {
	return (
		<div style={{ width: "280px", fontFamily: "Poppins" }}>
			<div className="d-flex">
				<div className={styles.reviewerImg}>
					<img src={AvatarPlaceholder.src} style={{ height: 40 }} alt="" />
				</div>

				<div className="" style={{ margin: "auto 0 auto 10px", flexGrow: 1 }}>
					<h4 className={styles.reviewerName}>Joseph G</h4>
					<div className={styles.reviewDate}>2 Days ago</div>
				</div>

				<div className={styles.starsContainer} style={{ display: "flex" }}>
					{new Array(numStars).fill("").map((idx) => (
						<div key={idx} className={styles.star} style={{ margin: "auto" }}>
							<img src={PinkStar.src} style={{ height: 12, marginLeft: 5 }} alt="" />
						</div>
					))}
				</div>
			</div>

			<div className={styles.reviewText}>
				I’m a versatile bass player who also plays jazz-classical piano & violin. I graduated from a
				prestigious music college & have a lot of experience in performance. Hit me up for some
				music knowledge!
				{/* {text} */}
			</div>
		</div>
	);
};

export default Review;
