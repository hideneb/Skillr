import React from "react";
import Router from "next/router";
import styles from "./BookSessionCard.module.css";
import cx from "classnames";
import classNames from "classnames";
import Availability from "../Availability";
import {
  SkillrDto,
  SkillrLocalAvailabilityDto,
} from "../../../lib/types/skillr";
import { UserDto } from "../../../lib/types/user";

type BookSessionProps = {
  imgSrc: string;
  name: string;
  description: string;
  ratePerMinute: number;
  skillr: SkillrDto;
  availability?: SkillrLocalAvailabilityDto;
  user: UserDto | null;
};

const BookSessionCard: React.FC<BookSessionProps> = ({
  imgSrc,
  name,
  description,
  ratePerMinute,
  skillr,
  availability,
  user,
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
                {user ? (
                  <>
                    <button
                      className={styles.connectNowButton}
                      onClick={() =>
                        Router.push(
                          `/skillrs/${skillr.id}/skills/${skillr.skills[0].skillId}`
                        )
                      }
                    >
                      Connect Now
                    </button>
                    <button
                      className={styles.connectNowButton}
                      onClick={() => Router.push(`/chats/${skillr.id}`)}
                    >
                      Chat
                    </button>
                  </>
                ) : (
                  <button className={styles.connectNowButton}>
                    Connect Now
                  </button>
                )}
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
                <button
                  className={styles.connectNowButton}
                  onClick={() =>
                    Router.push(
                      `/skillrs/${skillr.id}/skills/${skillr.skills[0].skillId}`
                    )
                  }
                >
                  Connect Now
                </button>
                <button
                  className={styles.connectNowButton}
                  onClick={() => Router.push(`/chats/${skillr.id}`)}
                >
                  Chat
                </button>
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
