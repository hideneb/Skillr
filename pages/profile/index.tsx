import 'papercss';
import Link from 'next/link';
import React from 'react';
import Router from 'next/router';
import Stripe from '@stripe/stripe-js';
import { authedFetch } from '../../lib/authed-fetch';
import { GetServerSideProps } from 'next';
import { getUnexpiredToken } from '../../lib/api-helpers';
import { getPaymentMethod } from '../api/userStripe/payment-method';
import { UserDto } from '../../lib/types/user';
import { getUserById } from '../api/users/me';
import { getMySkillr, SkillrDDto } from '../api/skillrs/me';

type ProfileProps = {
    user: UserDto;
    paymentMethod: Stripe.PaymentMethod | null;
    skillr: SkillrDDto | null;
};
const Profile: React.FC<ProfileProps> = ({ user, paymentMethod, skillr }) => {
    const logout = () => {
        authedFetch(`/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((status) => {
                if (status.status) {
                    Router.push('/');
                }
            });
        return false;
    };

    const skillsLabel = `${skillr?.skills.length} skill${skillr?.skills.length === 1 ? '' : 's'}`;
    return (
        <>
            <h1>Profile</h1>
            {skillr && (
                <>
                    <h2>Pro Stuff</h2>
                    <ul>
                        <li>
                            <em>@{skillr.username}</em>
                            <Link href="/skillr/profile">View Skillr profile</Link>
                        </li>
                        {skillr.skills && (
                            <li>
                                <Link href={`/skillr/skills`}>{skillsLabel}</Link>
                            </li>
                        )}
                        {skillr.stripeAccountStatus !== 4 && (
                            <li>
                                <Link href="/skillr/profile#stripe">Payment</Link>
                            </li>
                        )}
                    </ul>
                </>
            )}
            <sub>General Stuff</sub>
            <ul>
                <li>
                    <Link href="/profile/personal-info">Personal Info</Link>
                </li>
                <li>
                    <Link href="/profile/payment-method">
                        {user.stripePaymentMethod ? 'Payment methods' : 'Set up Stripe Account'}
                    </Link>
                </li>
                <li>
                    <Link href="https://skillrhelp.zendesk.com/hc/en-us">Help</Link>
                </li>
                <li>
                    <Link href="mailto:support@skillr.com">Get support</Link>
                </li>
            </ul>
            <button onClick={() => logout()}>Log out</button>
            <pre>{JSON.stringify(skillr, null, 2)}</pre>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ({ query, req, res, resolvedUrl }) => {
    const { profileID, ...rest } = query;
    if (profileID) {
        return {
            redirect: {
                permanent: true,
                destination: `/skillrs/${query.profileID}?${new URLSearchParams(rest as Record<string, string>)}`,
            },
            props: {},
        };
    }

    const token = await getUnexpiredToken(req, res);
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?r=${encodeURIComponent(resolvedUrl)}`,
            },
            props: {},
        };
    }

    const user = await getUserById(token.jwt, token.id);
    const skillr = user.skillr ? await getMySkillr(token.jwt) : null;

    const paymentMethod = user.stripePaymentMethod ? await getPaymentMethod(token.jwt).catch(() => null) : null;

    return {
        props: {
            user,
            paymentMethod,
            skillr,
        },
    };
};

export default Profile;
