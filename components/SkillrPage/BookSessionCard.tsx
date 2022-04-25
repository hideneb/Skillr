import React from "react";
import styles from "./styles/components/BookSessionCard.module.css";
import cx from "classnames";
import classNames from "classnames";
import Availability from "./Availability";
import { SkillrLocalAvailabilityDto } from "../../api/v1/types";

type BookSessionProps = {
  imgSrc: string;
  name: string;
  description: string;
  ratePerMinute: number;
  availability?: SkillrLocalAvailabilityDto;
};

const BookSessionCard: React.FC<BookSessionProps> = ({
  imgSrc,
  name,
  description,
  ratePerMinute,
  availability,
}) => {
  return (
    <div className={cx(styles.card, styles.bookSessionContainer)}>
      <div className="d-flex flex-column" style={{ flex: 1 }}>
        <div className="d-flex">
          <div className={styles.bookSessionImgContainer}>
            {imgSrc ? (
              <img height={"100%"} width={"100%"} alt="" src={imgSrc} />
            ) : null}
          </div>
          <div className="d-flex" style={{ flexGrow: 1 }}>
            <div className={styles.bookSessionTextContainer}>
              <h3 className={styles.title}>{name}</h3>
              <div className={styles.connectRow}>
                {ratePerMinute ? (
                  <div className={styles.rate}>
                    ${(ratePerMinute / 100).toFixed(2)}/min
                  </div>
                ) : (
                  ""
                )}
                <button className={styles.connectNowButton}>Connect Now</button>
              </div>
              <p
                className={classNames(
                  styles.bookSessionDescription,
                  styles.mobileBookSessionDescription
                )}
              >
                {description}
              </p>
              <div
                className={classNames(
                  styles.connectRow,
                  styles.mobileConnectRow
                )}
              >
                {ratePerMinute ? (
                  <div className={styles.rate}>
                    ${(ratePerMinute / 100).toFixed(2)}/min
                  </div>
                ) : (
                  ""
                )}
                <button className={styles.connectNowButton}>Connect Now</button>
              </div>
            </div>
          </div>
        </div>
        <p className={styles.bookSessionDescription}>{description}</p>
      </div>
      <div className={styles.availability}>
        {availability && <Availability availability={availability} />}
      </div>
    </div>
  );
};

export default BookSessionCard;
