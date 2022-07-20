import React from 'react';
import styles from './ProfileCard.module.css';
import ProfileVideos from '../ProfileVideos';
import cx from 'classnames';
import type { SkillrMediaDto } from '@/lib/types/skillr';

type ProfileCardProps = {
    imgSrc: string;
    name: string;
    description: string;
    ratePerMinute: number;
    skillrImages: SkillrMediaDto[];
    featureImage: string;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
    imgSrc,
    name,
    description,
    ratePerMinute,
    skillrImages,
    featureImage,
}) => {
    const videos = skillrImages.filter((i) => !!i.video);

    return (
        <div>
            <div
                className={cx('w-full px-5 py-3 rounded-lg2', {
                    'shadow-skillr-lg': !!description || videos.length > 0,
                })}
            >
                <p className="text-base">{description}</p>
                <div className="mt-3">
                    <div className="d-flex">
                        <div className={styles.profileDetailsCardImgContainer}>
                            {imgSrc ? <img height={'100%'} width={'100%'} alt="" src={imgSrc} /> : null}
                        </div>
                        <div className="d-flex" style={{ flexGrow: 1 }}>
                            <div className={styles.profileCardTextContainer}>
                                <div className={styles.title}>{name}</div>
                                <div className={styles.rateContainer}>
                                    {ratePerMinute && (
                                        <div className={styles.rate}>${(ratePerMinute / 100).toFixed(2)}/min</div>
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
        </div>
    );
};
