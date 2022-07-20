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
import Availability from '@/components/UI/Availability';
import { ConnectNow } from '@/components/UI/ConnectNow/ConnectNow';
import { isPageVisible } from '@/lib/is-page-visible';
import { getFeatureBackgroundImg } from '@/lib/get-feature-background-img';

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

    return {
        props: {
            skillrDDto: skillr,
            accountLink: accountLink?.url ? accountLink : null,
            stripeLoginLink: stripeLoginLink?.url ? stripeLoginLink : null,
            payoutMethod,
            languages,
            presentUntil,
            backgroundImg: getFeatureBackgroundImg(skillr.skills),
        },
    };
};

const SkillrProfile: React.FC<SkillrProfileProps> = (props) => {
    const { skillrDDto, accountLink, stripeLoginLink, payoutMethod, languages, backgroundImg } = props;
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

    // const s = skillrDDto.skills?.[0];
    // const lightIcon = s?.skill?.lightIcon;
    // const name = s?.skill?.name;
    // const ratePerMinute = s?.ratePerMinute;

    return (
        <>
            {/* <div>
                <img
                    className="w-full min-h-[310px] max-h-[310px] md:max-h-[400px] object-none md:object-fill"
                    src="https://images.unsplash.com/photo-1535320404287-416e2c6d2b41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Woman training with rubberbands on floor"
                ></img>
            </div> */}
            <div
                className="w-full h-full min-h-[300px] md:min-h-[400px] bg-cover bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${backgroundImg})`,
                }}
            ></div>
            <div className="px-6 md:py-8 max-w-[1000px] mx-auto">
                <section className="md:flex md:justify-between">
                    <div className="md:flex md:gap-5">
                        <div className="flex items-center justify-center -mt-16 md:mt-0 ">
                            <div className="bg-white rounded-full">
                                <img
                                    className="rounded-full w-[120px] h-[120px]"
                                    src={skillrDDto.profileImage ?? '/avatar-placeholder.svg'}
                                    alt={skillrDDto.user.displayName}
                                ></img>
                            </div>
                        </div>
                        <div>
                            {skillrDDto.username && (
                                <div className="flex items-center justify-center">
                                    <p className="text-2xl">@{skillrDDto.username}</p>
                                </div>
                            )}
                            <div className="flex items-center justify-center">
                                <h1 className="font-bold font-redhat text-3xl">{skillrDDto.user.displayName}</h1>
                            </div>
                            <div className="flex items-center justify-center gap-5 mt-4">
                                {skillrDDto.instagram && (
                                    <a href={skillrDDto.instagram} target="_blank" rel="noreferrer">
                                        <img className="w-5" src="/social-instagram-black-border.svg" alt="Instagram" />
                                    </a>
                                )}
                                {skillrDDto.linkedin && (
                                    <a href={skillrDDto.linkedin} target="_blank" rel="noreferrer">
                                        <img className="w-5" src="/linkedin.svg" alt="LinkedIn" />
                                    </a>
                                )}
                                {skillrDDto.twitter && (
                                    <a href={skillrDDto.twitter} target="_blank" rel="noreferrer">
                                        <img className="w-5" src="/twitter.svg" alt="Twitter" />
                                    </a>
                                )}
                                {skillrDDto.tiktok && (
                                    <a href={skillrDDto.tiktok} target="_blank" rel="noreferrer">
                                        <img className="w-5" src="/tiktok.svg" alt="Tiktok" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <AppStore></AppStore>
                    </div>
                </section>
                <div className="mt-4">
                    <hr></hr>
                </div>
                <div className="mt-4 md:flex justify-between gap-12 w-full ">
                    <section>
                        <div className="w-full px-5 py-3 shadow-skillr-lg rounded-lg2">
                            <p className="text-base">
                                {skillrDDto.about ??
                                    // @todo: remove placeholder text
                                    'Passionate yoga teacher with over 3+ years of professional experience in designing and leading flow and vinyasa yoga classes. In June 2018, completed an Advanced 300-Hour Yoga Teacher Training in Bali, Indonesia, and acquired an in-depth knowledge about postures, breathing techniques, and spiritual elements of yoga teaching.Indonesia, and acquired an in-depth knowledge about postures, breathing techniques, and spiritual elements of yoga teaching. '}
                            </p>
                        </div>

                        {/* <ProfileCard></ProfileCard> */}
                        {/* <SkillCard skill={{}}></SkillCard> */}
                    </section>
                    <section className="mt-7 md:mt-0">
                        <Availability availability={skillrDDto.localAvailability}></Availability>
                        <div className="mt-5">
                            <ConnectNow></ConnectNow>
                        </div>
                    </section>
                </div>
            </div>
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
