import React, { FormEvent, useState } from 'react';
import OnboardingLayout from '@/components/UI/Onboarding/OnboardingLayout/OnboardingLayout';
import { GetServerSideProps } from 'next';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getSkillrById } from 'pages/api/skillrs/[skillrId]';
import Router from 'next/router';
import TextField from '@/components/UI/TextField/TextField';
import classNames from 'classnames';
import StepsController from '@/components/UI/Onboarding/StepsController/StepsController';
import { SkillrOnboardingSteps } from '@/lib/types/skillr';
import { SkillrDDto } from 'pages/api/skillrs/me';
import { apiHostFetch } from '@/lib/api-fetch';
import { UserToken } from '@/lib/types/user';

type BasicInfoProps = {
    skillrDDto: SkillrDDto;
    token: UserToken;
};

const BasicInfo: React.FC<BasicInfoProps> = ({ skillrDDto, token }) => {
    const [username, setUsername] = React.useState(skillrDDto.username);
    const [about, setAbout] = React.useState(skillrDDto.about);
    const [isLoading, setIsLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        setIsLoading(true);

        const payload = {
            username,
            about,
        };

        try {
            const data = await apiHostFetch(`/api/app/skillrs`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.jwt}`,
                },
            }).then((res) => res.json());

            if (data.id) {
                Router.push(`/onboarding/skillr/steps/social`);
            } else {
                setUsernameError(data.errors?.[0]?.messages?.[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return (
        <OnboardingLayout>
            <div className="pt-5 pb-9">
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex px-4 flex-col items-center">
                        <h2 className="font-semibold mb-1 text-xl md:text-3xl text-center">Basic info</h2>
                        <p className="text-sm text-center">
                            Complete all required fields below. Don&apos;t worry, you can always change them later.
                        </p>
                    </div>
                    <hr className="my-4 md:my-5" />
                    <div className="px-4 md:px-10 flex flex-col items-center space-y-5 md:space-y-9">
                        <div className="space-y-2 md:max-w-[327px] w-full">
                            <p className="text-xl font-bold text-center">What is your username?</p>
                            <TextField
                                name="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="Enter username?"
                                required
                            />
                            {!!usernameError && <p className="text-skillr-pink text-xs">{usernameError}</p>}
                        </div>

                        <div className="space-y-2 max-w-[690px] w-full">
                            <p className="text-xl font-bold text-center">
                                Write a 3-5 sentence bio. Tell users about yourself!
                            </p>
                            <textarea
                                name="about"
                                rows={4}
                                value={about}
                                maxLength={1000}
                                onChange={(event) => setAbout(event.target.value)}
                                className="w-full px-4 py-2 overflow-visible outline-0 border-b-2 focus:border-slate-900 bg-gray-100"
                                placeholder="Enter about info"
                                required
                            />

                            <p
                                className={classNames('text-xs text-right', {
                                    'text-skillr-pink': about?.length >= 1000,
                                })}
                            >
                                {about?.length || 0}/1000
                            </p>
                        </div>

                        <StepsController current={SkillrOnboardingSteps.BASIC_INFO} isNextLoading={isLoading} />
                    </div>
                </form>
            </div>
        </OnboardingLayout>
    );
};

export default BasicInfo;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = await getUnexpiredToken(ctx.req, ctx.res);
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: `/onboarding/skillr`,
            },
            props: {},
        };
    }

    const skillr = await getSkillrById(token.id);

    return {
        props: {
            skillrDDto: skillr,
            token,
        },
    };
};
