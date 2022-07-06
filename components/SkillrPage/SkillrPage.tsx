import React from 'react';
import styles from './SkillerPage.module.css';
import ProfileHeader from '../UI/ProfileHeader';
import ProfileCard from '../UI/ProfileCard';
import Availability from '../UI/Availability';
import { SkillrDto } from '../../lib/types/skillr';
import { UserDto } from '../../lib/types/user';
import SimpleFooter from '../../components/Footer/SimpleFooter';
import Head from 'next/head';

type SkillrProfileProps = {
    skillr: SkillrDto;
    user: UserDto | null;
};

const SkillrPage: React.FC<SkillrProfileProps> = ({ skillr }) => {
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
    const { lightIcon, name } = s.skill;
    const { ratePerMinute } = s;

    //todo: extend this map to contain image names for all categories
    const profileBanners = new Map([
        //Be-Entertained
        ['Comedians', 'Be-Entertained'],
        ['DJ', 'Be-Entertained'],
        ['Live Music', 'Be-Entertained'],
        ['Live Performance', 'Be-Entertained'],
        ['Singer Songwriter', 'Be-Entertained'],
        ['Tarot & Astrology', 'Be-Entertained'],
        ['Witchcraft Consultant', 'Be-Entertained'],
        // Eat-n-Drink
        ['Baking & Pastries', 'Eat-n-Drink'],
        ['Chefs', 'Eat-n-Drink'],
        ['Grilling', 'Eat-n-Drink'],
        ['Italian', 'Eat-n-Drink'],
        ['Wine & Beer Experts', 'Eat-n-Drink'],
        // Find-Your-Look
        ['Makeup', 'Find-Your-Look'],
        ['Stylists', 'Find-Your-Look'],
        // Fix-Stuff
        ['Cannabis Cultivation', 'Fix-Stuff'],
        ['Gardeners', 'Fix-Stuff'],
        ['Gardening Professional', 'Fix-Stuff'],
        // Get-Advice
        ['Fantasy Sports Advice', 'Get-Advice'],
        ['Cannabis Concierge', 'Get-Advice'],
        ['Crypto Advice', 'Get-Advice'],
        ['Divorce Advice', 'Get-Advice'],
        ['Job Interview', 'Get-Advice'],
        //Get-Coached
        ['Dating Help', 'Get-Coached'],
        ['Pet Behaviorist', 'Get-Coached'],
        ['Sober Coach', 'Get-Coached'],
        //Get Creative
        ['Dance', 'Get-Creative'],
        ['Guitar', 'Get-Creative'],
        ['Music', 'Get-Creative'],
        ['Shuffle & Shapes', 'Get-Creative'],
        ['Singing', 'Get-Creative'],
        // Get-Fit
        ['Breathwork', 'Get-Fit'],
        ['Fitness Trainer', 'Get-Fit'],
        ['Flow', 'Get-Fit'],
        ['Guided Meditation', 'Get-Fit'],
        ['Quit Coach', 'Get-Fit'],
        ['Smoking', 'Get-Fit'],
        ['Wellness', 'Get-Fit'],
        ['Yoga Instructors', 'Get-Fit'],
        // Get-Smart
        ['Biology', 'Get-Smart'],
        ['Chemistry', 'Get-Smart'],
        ['College Prep', 'Get-Smart'],
        ['Math HW Help', 'Get-Smart'],
        ['Physics', 'Get-Smart'],
        ['Science HW Help', 'Get-Smart'],
        //Play-Sports
        ['Golf Instructors', 'Play-Sports'],
    ]);

    const backgroundImage = `/category-banners/${profileBanners.get(s.skill.name) || 'default'}.jpg`;

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
                    backgroundImage: `url(${backgroundImage})`,
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
                            featureImage={backgroundImage}
                        />
                    </div>
                    <div className={styles.colRight}>
                        <div className={styles.availability}>
                            {localAvailability && <Availability availability={localAvailability} />}
                            <a
                                href="https://apps.apple.com/us/app/skillr-learn-from-an-expert/id1574736206"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button
                                    className={styles.connectNowButton}
                                    // onClick={() =>
                                    // 	Router.push(`/skillrs/${skillr.id}/skills/${skillr.skills[0].skillId}`)
                                    // }
                                >
                                    Connect Now
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <SimpleFooter />
        </div>
    );
};

export default SkillrPage;
