import React from 'react';
import styles from './SkillerPage.module.css';
import ProfileHeader from '../ProfileHeader';
import ProfileCard from '../ProfileCard';
import Availability from '../Availability';
import { SkillrDto } from '../../../lib/types/skillr';
import { UserDto } from '../../../lib/types/user';
import Footer from '../Footer';
import Head from 'next/head';
import { ConnectNow } from '../ConnectNow/ConnectNow';

type SkillrProfileProps = {
    skillr: SkillrDto;
    user: UserDto | null;
    backgroundImg: string;
};

const SkillrPage: React.FC<SkillrProfileProps> = ({ skillr, backgroundImg }) => {
    const {
        username,
        about,
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
    const lightIcon = s?.skill?.lightIcon;
    const name = s?.skill?.name;
    const ratePerMinute = s?.ratePerMinute;

    return (
        <div>
            <Head>
                <title>@{username} - Skillr</title>
                <meta name="description" content={about} />
                <meta property="og:title" content={`@${username}`} />
                <meta property="og:description" content={about} />
                <meta property="og:image" content={profileImage} />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:alt" content={`@${username}`} />
                <meta property="og:url" content={`https://skillr.co/profile?profileId=${skillr.id}`} />
                <meta property="og:type" content="profile" />
                <meta property="og:site_name" content="Skillr" />
                <meta property="og:locale" content="en_US" />
            </Head>
            <div
                className={styles.header}
                style={{
                    backgroundImage: `url(${backgroundImg})`,
                }}
            ></div>
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
                            description={about}
                            ratePerMinute={ratePerMinute}
                            skillr={skillr}
                            featureImage={backgroundImg}
                        />
                    </div>
                    <div className={styles.colRight}>
                        <div className={styles.availability}>
                            {localAvailability && <Availability availability={localAvailability} />}
                            <ConnectNow></ConnectNow>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SkillrPage;
