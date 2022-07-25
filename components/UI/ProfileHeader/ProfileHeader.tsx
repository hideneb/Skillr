import classNames from 'classnames';
import { ChangeEvent } from 'react';
import { AppStore } from '../AppStore/AppStore';
import SkillrEditIcon from '../SkillrPage/SkillrEditIcon';
import styles from './ProfileHeader.module.css';

type ProfileHeaderProps = {
    isEditable?: boolean;
    handleProfileImageSubmit?: (imageFile: File) => void;
    profileImage: string;
    username: string;
    displayName: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    isEditable,
    profileImage,
    handleProfileImageSubmit,
    username,
    displayName,
    linkedin,
    instagram,
    twitter,
    tiktok,
}) => {
    const uploadImageFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (handleProfileImageSubmit && e.target.files?.[0]) {
            handleProfileImageSubmit(e.target.files[0]);
        }
        e.target.value = '';
    };

    return (
        <div className="md:flex md:justify-between">
            <div className="md:flex">
                <div className="flex relative items-center justify-center -mt-16 md:mt-0 md:mr-5">
                    <div className="bg-white rounded-full">
                        <img
                            className="rounded-full object-cover w-[120px] h-[120px]"
                            src={profileImage ?? '/avatar-placeholder.svg'}
                            alt={displayName}
                        ></img>
                    </div>
                    {isEditable && (
                        <div className="absolute z-10 bottom-0 right-0">
                            <div className="relative">
                                <input
                                    className="top-0 absolute w-full cursor-pointer opacity-0 h-full"
                                    type="file"
                                    onChange={uploadImageFile}
                                    accept="image/jpeg, image/png"
                                />
                                <SkillrEditIcon />
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {username && (
                        <div className="flex items-center justify-center">
                            <p className="text-2xl">@{username}</p>
                        </div>
                    )}

                    <div className="flex items-center justify-center">
                        <h1
                            className={classNames('font-bold font-redhat text-3xl', {
                                [styles.displayNameLong]: displayName.length > 25,
                            })}
                        >
                            {displayName}
                        </h1>
                    </div>

                    <div className="flex items-center justify-center gap-5 mt-4">
                        {instagram && (
                            <a href={instagram} target="_blank" rel="noreferrer">
                                <img className="w-5" src="/social-instagram-black-border.svg" alt="Instagram" />
                            </a>
                        )}
                        {linkedin && (
                            <a href={linkedin} target="_blank" rel="noreferrer">
                                <img className="w-5" src="/linkedin.svg" alt="LinkedIn" />
                            </a>
                        )}
                        {twitter && (
                            <a href={twitter} target="_blank" rel="noreferrer">
                                <img className="w-5" src="/twitter.svg" alt="Twitter" />
                            </a>
                        )}
                        {tiktok && (
                            <a href={tiktok} target="_blank" rel="noreferrer">
                                <img className="w-5" src="/tiktok.svg" alt="Tiktok" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-4 md:mt-0">
                <AppStore></AppStore>
            </div>
        </div>
    );
};
