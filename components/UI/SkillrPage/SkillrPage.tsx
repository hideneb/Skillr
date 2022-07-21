import React from 'react';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader';
import { ProfileCard } from '../ProfileCard/ProfileCard';
import { Availability } from '../Availability/Availability';
import { SkillrDto } from '../../../lib/types/skillr';
import { UserDto } from '../../../lib/types/user';
import { Footer } from '../Footer/Footer';
import Head from 'next/head';
import { ConnectNow } from '../ConnectNow/ConnectNow';
import { SkillrPageBanner } from './SkillrPageBanner';

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
            <SkillrPageBanner backgroundImg={backgroundImg}></SkillrPageBanner>
            <div className="px-6 md:py-8 max-w-[1000px] mx-auto">
                <section>
                    <ProfileHeader
                        username={username}
                        displayName={displayName}
                        profileImage={profileImage}
                        instagram={instagram}
                        linkedin={linkedin}
                        twitter={twitter}
                        tiktok={tiktok}
                    />
                </section>
                <div className="mt-4">
                    <hr></hr>
                </div>
                <div className="mt-4 md:flex justify-between gap-12 w-full ">
                    <section>
                        <ProfileCard
                            key={name}
                            imgSrc={lightIcon}
                            name={name}
                            description={about}
                            ratePerMinute={ratePerMinute}
                            skillrImages={skillr.images}
                            featureImage={backgroundImg}
                        />
                    </section>
                    <section className="mt-7 md:mt-0">
                        <Availability initialAvailability={localAvailability}></Availability>
                        <div className="mt-5">
                            <ConnectNow></ConnectNow>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SkillrPage;
