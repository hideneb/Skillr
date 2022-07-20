import React from 'react';
import styles from './ProfileCard.module.css';
import cx from 'classnames';
import { SkillrDto } from '@/lib/types/skillr';
import ProfileVideos from '../ProfileVideos';

type ProfileCardProps = {
    imgSrc: string;
    name: string;
    description: string;
    ratePerMinute: number;
    skillr: SkillrDto;
    featureImage: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
    imgSrc,
    name,
    description,
    ratePerMinute,
    skillr,
    featureImage,
}) => {
    const videos = skillr.images.filter((i) => !!i.video);

    return (
        <div className={cx(styles.card, styles.profileCardContainer)}>
            <div className="d-flex flex-column" style={{ flex: 1, maxWidth: '100%' }}>
                <p className={styles.profileCardDescription}>{description}</p>
                <div className="d-flex">
                    <div className={styles.profileDetialsCardImgContainer}>
                        {imgSrc ? <img height={'100%'} width={'100%'} alt="" src={imgSrc} /> : null}
                    </div>
                    <div className="d-flex" style={{ flexGrow: 1 }}>
                        <div className={styles.profileCardTextContainer}>
                            <div className={styles.title}>{name}</div>
                            <div className={styles.rateContainer}>
                                {ratePerMinute ? (
                                    <div className={styles.rate}>${(ratePerMinute / 100).toFixed(2)}/min</div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {videos.length > 0 && (
                    <div className={styles.videos}>
                        <div className={styles.videosTitle}>Videos</div>
                        <ProfileVideos featureImage={featureImage} videos={videos} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
