import React, { ChangeEvent, FormEvent, useState } from 'react';
import OnboardingLayout from '@/components/UI/Onboarding/OnboardingLayout/OnboardingLayout';
import { GetServerSideProps } from 'next';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getSkillrById } from 'pages/api/skillrs/[skillrId]';
import { SkillrDDto } from 'pages/api/skillrs/me';
import axios from 'redaxios';
import Router from 'next/router';
import TextField from '@/components/UI/TextField/TextField';
import StepsController from '@/components/UI/Onboarding/StepsController/StepsController';
import { SkillrOnboardingSteps } from '@/lib/types/skillr';

type AddSocialInfoProps = {
    skillrDDto: SkillrDDto;
};

const AddSocialInfo: React.FC<AddSocialInfoProps> = ({ skillrDDto }) => {
    const [socialDetails, setSocialDetails] = useState({
        instagram: skillrDDto.instagram,
        linkedin: skillrDDto.linkedin,
        twitter: skillrDDto.twitter,
        tiktok: skillrDDto.tiktok,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [socialError, setSocialError] = useState('');

    const { instagram, linkedin, twitter, tiktok } = socialDetails;

    // onChange handler for input fields
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSocialDetails({
            ...socialDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        setIsLoading(true);

        try {
            const { data } = await axios.put(`/api/skillrs`, socialDetails);

            if (data.id) {
                Router.push(`/onboarding/skillr/steps/image`);
            } else {
                setSocialError(data.errors?.[0]?.messages?.[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return (
        <OnboardingLayout>
            <div className="pt-5 pb-9">
                <div className="w-full">
                    <div className="flex px-4 flex-col items-center">
                        <h2 className="font-semibold mb-1 text-xl md:text-3xl text-center">Social media</h2>
                        <p className="text-sm text-center">
                            Complete all required fields below. Don&apos;t worry, you can always change them later.
                        </p>
                    </div>
                    <hr className="my-4 md:my-5" />
                    <div className="px-4 md:px-10">
                        <div className="w-full max-w-[690px] mx-auto flex flex-col space-y-5 md:space-y-5">
                            <h3 className="text-center font-bold text-xl">What are your social media accounts?</h3>
                            <form onSubmit={handleSubmit} className="w-full">
                                <div className="space-y-5 md:space-y-9">
                                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-9">
                                        <div className="space-y-2 w-full">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm font-semibold">Instagram</p>
                                                <p className="text-sm text-gray-500">Optional</p>
                                            </div>
                                            <TextField
                                                name="instagram"
                                                value={instagram}
                                                onChange={handleChange}
                                                placeholder="Enter Instagram Username"
                                            />
                                        </div>

                                        <div className="space-y-2 w-full">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm font-semibold">Linkedin</p>
                                                <p className="text-sm text-gray-500">Optional</p>
                                            </div>
                                            <TextField
                                                name="linkedin"
                                                value={linkedin}
                                                onChange={handleChange}
                                                placeholder="Enter Linkedin Username"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-9">
                                        <div className="space-y-2 w-full">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm font-semibold">Twitter</p>
                                                <p className="text-sm text-gray-500">Optional</p>
                                            </div>
                                            <TextField
                                                name="twitter"
                                                value={twitter}
                                                onChange={handleChange}
                                                placeholder="Enter Twitter Username"
                                            />
                                        </div>

                                        <div className="space-y-2 w-full">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm font-semibold">TikTok</p>
                                                <p className="text-sm text-gray-500">Optional</p>
                                            </div>
                                            <TextField
                                                name="tiktok"
                                                value={tiktok}
                                                onChange={handleChange}
                                                placeholder="Enter TikTok Username"
                                            />
                                        </div>
                                    </div>
                                    {!!socialError && (
                                        <p className="text-skillr-pink text-center text-xs">{socialError}</p>
                                    )}
                                </div>
                                <div className="mt-12">
                                    <StepsController
                                        current={SkillrOnboardingSteps.SOCIAL_MEDIA}
                                        isNextLoading={isLoading}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default AddSocialInfo;

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
        props: { skillrDDto: skillr },
    };
};
