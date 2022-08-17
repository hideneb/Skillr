import React, { useState } from 'react';
import styles from './ProfileCard.module.css';
import ProfileVideos from '../ProfileVideos';
import cx from 'classnames';
import type { SkillrMediaDto } from '@/lib/types/skillr';
import SkillrEditIcon from '../SkillrPage/SkillrEditIcon';
import { SkillrDDto } from 'pages/api/skillrs/me';

type ProfileCardProps = {
    isEditable?: boolean;
    imgSrc: string;
    name: string;
    description: string;
    ratePerMinute: number;
    skillrImages: SkillrMediaDto[];
    featureImage: string;
    handleSaveChanges?: (values: Partial<SkillrDDto>) => Promise<void>;
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ isEditable, handleSaveChanges, ...rest }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [cardDetails, setCardDetails] = useState(rest);

    const { imgSrc, name, description, ratePerMinute, skillrImages, featureImage } = cardDetails;

    const videos = skillrImages.filter((i) => !!i.video);

    const handleSave = async () => {
        if (handleSaveChanges) {
            await handleSaveChanges({ about: description });
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCardDetails(rest);
    };

    return (
        <div>
            <div
                className={cx('w-full px-6 py-9 relative rounded-lg2', {
                    'shadow-skillr-lg': !!description || videos.length > 0,
                })}
            >
                {isEditable && !isEditing && (
                    <div className="w-fit absolute right-3 top-1">
                        <SkillrEditIcon onClick={() => setIsEditing(true)} />
                    </div>
                )}
                {!isEditing && <p className={styles.profileCardDescription}>{description}</p>}
                {isEditing && (
                    <div className="space-y-4">
                        <textarea
                            value={description}
                            onChange={(event) =>
                                setCardDetails((prev) => ({ ...prev, description: event.target.value }))
                            }
                            className="w-full p-2 border rounded-md min-h-[10rem]"
                        />
                        <div className="flex space-x-3">
                            <button onClick={handleSave} className={styles.saveButton}>
                                Save
                            </button>
                            <button onClick={handleCancel} className={styles.cancelButton}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                <div className="mt-3">
                    <div className="d-flex space-x-4 md:space-x-8">
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
