import { GetServerSideProps } from 'next';
import React, { FormEvent, useState } from 'react';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getMySkillr, SkillrDDto } from '../../api/skillrs/me';
// import { authedFetch } from '@/lib/authed-fetch';
import { getPayoutMethod } from '../../api/skillrStripe/payout-method';
import { getStripeLoginLink } from '../../api/skillrStripe/stripe-login-link';
import { createPaymentInfo } from '../../api/skillrStripe/payment-info';
import { PayoutMethod, StripeAccountStatus, StripeLink } from '@/lib/types/stripe';
import { findLanguages, LanguageDto } from '../../api/languages';
import { getSkillrPresence, SkillrPresenceDto } from '../../api/skillrPresence';
import { AppStore } from '@/components/UI/AppStore/AppStore';
import { Availability } from '@/components/UI/Availability/Availability';
import { ConnectNow } from '@/components/UI/ConnectNow/ConnectNow';
import { getFeatureBackgroundImg } from '@/lib/get-feature-background-img';
import Head from 'next/head';
import { SkillrPageBanner } from '@/components/UI/SkillrPage/SkillrPageBanner';
import { ProfileHeader } from '@/components/UI/ProfileHeader/ProfileHeader';
import { Footer } from '@/components/UI/Footer/Footer';
import { ProfileCard } from '@/components/UI/ProfileCard/ProfileCard';
import { SkillrLocalAvailabilityDto } from '@/lib/types/skillr';
import { authedFetch } from '@/lib/authed-fetch';
import { isPageVisible } from '@/lib/environment';
import { getSkillById } from 'pages/api/skills/[skillId]';
import { SkillDto } from 'pages/api/skills';

export type SkillrLanguageDto = {
    languageId: number;
};
export type SkillrStep1 = {
    username: string;
};

export type SkillrStep2 = {
    tagline: string;
    about: string;
    username: string;
    instagram: string;
    linkedin: string;
    languages: SkillrLanguageDto[];
    countryCode: number;
    mobileNumber: string;
    submit: boolean;
    cancel: boolean;
};

type SkillrProfileProps = {
    skillrDDto: SkillrDDto;
    accountLink: StripeLink | null;
    stripeLoginLink: StripeLink | null;
    payoutMethod: PayoutMethod | null;
    languages: LanguageDto[];
    presentUntil: string | null;
    backgroundImg: string;
    skillrSkillCategory: SkillDto | null;
};

export const getServerSideProps: GetServerSideProps<SkillrProfileProps> = async (context) => {
    if (!isPageVisible(context.query)) {
        return {
            notFound: true,
        };
    }

    const token = await getUnexpiredToken(context.req, context.res);
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?r=${encodeURIComponent(context.resolvedUrl)}`,
            },
            props: {},
        };
    }

    const skillr = await getMySkillr(token.jwt);

    const accountLink = !skillr.stripeAccountId ? await createPaymentInfo(token.jwt) : null;

    const stripeLoginLink =
        skillr.stripeAccountId && skillr.stripeAccountStatus !== StripeAccountStatus.ENABLED
            ? await getStripeLoginLink(token.jwt)
            : null;

    const payoutMethod =
        skillr.stripeAccountId && skillr.stripeAccountStatus === StripeAccountStatus.ENABLED
            ? await getPayoutMethod(token.jwt)
            : null;

    const languages = await findLanguages();

    const presentUntil = await getSkillrPresence(token.jwt).then(
        ({ presentUntil }) => presentUntil?.toString() || null
    );

    const skillrSkill = skillr.skills?.[0];
    const skillrSkillCategory = skillrSkill ? await getSkillById(skillrSkill?.skill.parentId) : null;

    return {
        props: {
            skillrDDto: skillr,
            accountLink: accountLink?.url ? accountLink : null,
            stripeLoginLink: stripeLoginLink?.url ? stripeLoginLink : null,
            payoutMethod,
            languages,
            presentUntil,
            backgroundImg: getFeatureBackgroundImg(skillr.skills),
            skillrSkillCategory,
        },
    };
};

const SkillrProfile: React.FC<SkillrProfileProps> = (props) => {
    const { skillrDDto/*, accountLink, stripeLoginLink, payoutMethod, languages*/, backgroundImg, skillrSkillCategory } =
        props;
    const [profileImage, setProfileImage] = useState<string>(skillrDDto.profileImage);
    // const [tagline, setTagline] = useState<string>(skillrDDto.tagline);
    // const [about, setAbout] = useState<string>(skillrDDto.about);
    // const [username, setUsername] = useState<string>(skillrDDto.username);
    // const [instagram, setInstagram] = useState<string>(skillrDDto.instagram || '');
    // const [linkedin, setLinkedin] = useState<string>(skillrDDto.linkedin || '');
    // const [presentUntil, setPresentUntil] = useState<Date | null>(
    //     props.presentUntil ? new Date(props.presentUntil) : null
    // );

    // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();

    //     const skillrStep2: Partial<SkillrStep2> = {
    //         tagline,
    //         about,
    //         username,
    //         instagram: instagram || undefined,
    //         linkedin: linkedin || undefined,
    //         submit: true,
    //         cancel: false,
    //     };

    //     await authedFetch('/api/skillrs', {
    //         method: 'PUT',
    //         body: JSON.stringify(skillrStep2),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).then((res) => res.json());
    // };

    // const skillrMediaBaseForm: Record<string, string> = {
    //     target: 'media',
    // };

    // const skillrMediaAllowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];

    // const activateSkillr = async (active: boolean) => {
    //     const skillrPresenceDto: SkillrPresenceDto = {
    //         presentUntil: active
    //             ? new Date(new Date().getTime() + 1000 * 60 * 130) // 2:10
    //             : undefined,
    //     };
    //     const { presentUntil } = await authedFetch('/api/skillrPresence', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(skillrPresenceDto),
    //     }).then((res) => res.json());

    //     setPresentUntil(presentUntil ? new Date(presentUntil) : null);
    // };

    const handleProfileImageSubmit = async (imageFile: File) => {
        if (!imageFile) {
            return;
        }

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('target', 'profileImage');

        await authedFetch('/api/skillrs/media', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                setProfileImage(res.profileImage);
            });
    };

    const handleUpdateSkillr = async (values: Partial<SkillrDDto>) => {
        await authedFetch('/api/skillrs', {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    const handleSaveAvailabilityChanges = async (availability: SkillrLocalAvailabilityDto) => {
        const skillrLocalAvailability: SkillrLocalAvailabilityDto = {
            ...availability,
            timezoneOffset: skillrDDto.localAvailability?.timezoneOffset || 0, // TODO: use actual timezoneOffset
            type: skillrDDto.availabilityType,
        };

        await handleUpdateSkillr({ localAvailability: skillrLocalAvailability });
    };

    const s = skillrDDto.skills?.[0];
    const lightIcon = s?.skill?.lightIcon;
    const name = s?.skill?.name;
    const ratePerMinute = s?.ratePerMinute;

    return (
        <>
            <Head>
                <title>@{skillrDDto.username} - Skillr</title>
                <meta name="description" content={skillrDDto.about} />
                <meta property="og:title" content={`@${skillrDDto.username}`} />
                <meta property="og:description" content={skillrDDto.about} />
                <meta property="og:image" content={skillrDDto.profileImage} />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:alt" content={`@${skillrDDto.username}`} />
                <meta property="og:url" content={`https://skillr.co/profile?profileId=${skillrDDto.id}`} />
                <meta property="og:type" content="profile" />
                <meta property="og:site_name" content="Skillr" />
                <meta property="og:locale" content="en_US" />
            </Head>
            <SkillrPageBanner backgroundImg={backgroundImg} categoryName={skillrSkillCategory?.name}></SkillrPageBanner>
            <div className="px-6 md:py-8 max-w-[1000px] mx-auto">
                <ProfileHeader
                    isEditable
                    handleProfileImageSubmit={handleProfileImageSubmit}
                    username={skillrDDto.username}
                    displayName={skillrDDto.user.displayName}
                    profileImage={profileImage}
                    instagram={skillrDDto.instagram}
                    linkedin={skillrDDto.linkedin}
                    twitter={skillrDDto.twitter}
                    tiktok={skillrDDto.tiktok}
                />
                <div className="mt-4">
                    <hr></hr>
                </div>
                <div className="mt-4 md:flex justify-between gap-12 w-full ">
                    <section className="w-full">
                        <ProfileCard
                            key={name}
                            isEditable
                            imgSrc={lightIcon}
                            name={name}
                            description={skillrDDto.about}
                            ratePerMinute={ratePerMinute}
                            skillrImages={skillrDDto.images}
                            featureImage={backgroundImg}
                            handleSaveChanges={handleUpdateSkillr}
                        />
                    </section>
                    <section className="mt-7 md:mt-0">
                        <Availability
                            isEditable
                            initialAvailability={skillrDDto.localAvailability}
                            handleSaveChanges={handleSaveAvailabilityChanges}
                        />
                        <div className="mt-5">
                            <ConnectNow></ConnectNow>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
            {/* <div>
                <h3>Active?</h3>
                <p>
                    {presentUntil ? (
                        <>
                            <strong>Yes</strong>
                            <br />
                            Until: {presentUntil.toLocaleDateString()} {presentUntil.toLocaleTimeString()}
                            <button onClick={() => activateSkillr(false)}>Deactivate</button>
                        </>
                    ) : (
                        <>
                            <strong>No</strong>
                            <br />
                            <button onClick={() => activateSkillr(true)}>Activate</button>
                        </>
                    )}
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <h2>Basic info</h2>
                <div>
                    <label>Choose a username</label>
                    <sub>This will be used for sharing and other</sub>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Your tagline</label>
                    <input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} />
                </div>
                <div>
                    <label>Tell us a bit about yourself</label>
                    <sub>This will be used for your Skillr pbulic profile</sub>
                    <textarea value={about} onChange={(e) => setAbout(e.target.value)} />
                </div>
                <div>
                    <label>What is your social media handle?</label>
                    <sub>This will be used for your Skillr pbulic profile</sub>
                    <em>Instagram</em>
                    <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="Instagram URL (optional)"
                    />
                    <em>Linkedin</em>
                    <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="LinkedIn URL (optional)"
                    />
                </div>
                <button type="submit">Save</button>
            </form>
            <div>
                <h2>Profile photo and video</h2>
                <div>
                    <h3>Add profile photo</h3>
                    <sub>You must be in the photo</sub>
                    <img
                        src={skillrDDto.profileImage}
                        alt="profile image"
                        style={{
                            width: '100px',
                        }}
                    />
                    <button type="button" onClick={() => Router.push('/skillr/profile/media')}>
                        Edit
                    </button>
                </div>
                <div>
                    <h3>Add profile media</h3>
                    <sub>Share a photo or video trailer that best showcases who you are</sub>
                    {skillrDDto.images.map((image) => {
                        return (
                            <ExistingMedia
                                key={image.id}
                                id={image.id}
                                media={{ url: image.video || image.image }}
                                baseForm={skillrMediaBaseForm}
                                allowUpdate={false}
                            />
                        );
                    })}
                    <NewMedia baseForm={skillrMediaBaseForm} accept={skillrMediaAllowedMimeTypes.join(' ')} />
                </div>
            </div>
            <div>
                <h2>General availability</h2>
                {skillrDDto.localAvailability && (
                    <ul>
                        <li>
                            <strong>Monday</strong>
                            <span>
                                {skillrDDto.localAvailability.day0Begin} - {skillrDDto.localAvailability.day0End}
                            </span>
                        </li>
                        <li>
                            <strong>Tuesday</strong>
                            <span>
                                {skillrDDto.localAvailability.day1Begin} - {skillrDDto.localAvailability.day1End}
                            </span>
                        </li>
                        <li>
                            <strong>Wednesday</strong>
                            <span>
                                {skillrDDto.localAvailability.day2Begin} - {skillrDDto.localAvailability.day2End}
                            </span>
                        </li>
                        <li>
                            <strong>Thursday</strong>
                            <span>
                                {skillrDDto.localAvailability.day3Begin} - {skillrDDto.localAvailability.day3End}
                            </span>
                        </li>
                        <li>
                            <strong>Friday</strong>
                            <span>
                                {skillrDDto.localAvailability.day4Begin} - {skillrDDto.localAvailability.day4End}
                            </span>
                        </li>
                        <li>
                            <strong>Saturday</strong>
                            <span>
                                {skillrDDto.localAvailability.day5Begin} - {skillrDDto.localAvailability.day5End}
                            </span>
                        </li>
                        <li>
                            <strong>Sunday</strong>
                            <span>
                                {skillrDDto.localAvailability.day6Begin} - {skillrDDto.localAvailability.day6End}
                            </span>
                        </li>
                    </ul>
                )}
                <button type="button" onClick={() => Router.push('/skillr/availability')}>
                    Edit availability
                </button>
            </div>
            <div>
                <h2>Languages</h2>
                <ul>
                    {skillrDDto.languages.map((skillrLanguage) => {
                        const language = languages.find((language) => language.id == skillrLanguage.languageId);
                        if (!language) {
                            return null;
                        }
                        return (
                            <li key={language.id}>
                                <strong>{language.name}</strong>
                            </li>
                        );
                    })}
                </ul>
                <button type="button" onClick={() => Router.push('/skillr/languages')}>
                    Edit languages
                </button>
            </div>
            <div id="stripe">
                <>
                    {payoutMethod && (
                        <>
                            <div>Stripe is set up!</div>
                            <pre>{JSON.stringify(payoutMethod, null, 2)}</pre>
                        </>
                    )}
                    {accountLink && (
                        // https://stripe.com/docs/connect/add-and-pay-out-guide
                        <Link href={accountLink?.url}>
                            <a>Set up Stripe Account</a>
                        </Link>
                    )}

                    {stripeLoginLink && (
                        // https://stripe.com/docs/connect/add-and-pay-out-guide
                        <Link href={stripeLoginLink?.url}>
                            <a>Set up Stripe</a>
                        </Link>
                    )}
                </>
            </div>
            <pre>{JSON.stringify(skillrDDto, null, 2)}</pre> */}
        </>
    );
};

export default SkillrProfile;
