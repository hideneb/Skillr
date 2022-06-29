import 'papercss';
import { GetServerSideProps } from 'next';
import React, { FormEvent, useState } from 'react';
import Router from 'next/router';
import { getUnexpiredToken } from '../../../lib/api-helpers';
import { getMySkillr, SkillrDDto } from '../../api/skillrs/me';
import { authedFetch } from '../../../lib/authed-fetch';
import Link from 'next/link';
import { getPayoutMethod } from '../../api/skillrStripe/payout-method';
import { getStripeLoginLink } from '../../api/skillrStripe/stripe-login-link';
import { createPaymentInfo } from '../../api/skillrStripe/payment-info';
import { PayoutMethod, StripeAccountStatus, StripeLink } from '../../../lib/types/stripe';
import { findLanguages, LanguageDto } from '../../api/languages';
import { ExistingMedia, NewMedia } from '../../../components/UI/Media';

export type SkillrLanguageDto = {
    languageId: number;
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
};
const SkillrProfile: React.FC<SkillrProfileProps> = (props) => {
    console.log(props);
    const { skillrDDto, accountLink, stripeLoginLink, payoutMethod, languages } = props;

    const [tagline, setTagline] = useState<string>(skillrDDto.tagline);
    const [about, setAbout] = useState<string>(skillrDDto.about);
    const [username, setUsername] = useState<string>(skillrDDto.username);
    const [instagram, setInstagram] = useState<string>(skillrDDto.instagram || '');
    const [linkedin, setLinkedin] = useState<string>(skillrDDto.linkedin || '');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const skillrStep2: Partial<SkillrStep2> = {
            tagline,
            about,
            username,
            instagram: instagram || undefined,
            linkedin: linkedin || undefined,
            submit: true,
            cancel: false,
        };

        await authedFetch('/api/skillrs', {
            method: 'PUT',
            body: JSON.stringify(skillrStep2),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    const skillrMediaBaseForm: Record<string, string> = {
        target: 'media',
    };

    const skillrMediaAllowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];

    return (
        <>
            <h1>Your Skillr Profile</h1>
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
            <pre>{JSON.stringify(skillrDDto, null, 2)}</pre>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<SkillrProfileProps> = async (context) => {
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

    return {
        props: {
            skillrDDto: skillr,
            accountLink: accountLink?.url ? accountLink : null,
            stripeLoginLink: stripeLoginLink?.url ? stripeLoginLink : null,
            payoutMethod,
            languages,
        },
    };
};

export default SkillrProfile;
