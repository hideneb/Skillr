import React, { useState } from 'react';
import OnboardingLayout from '@/components/UI/Onboarding/OnboardingLayout/OnboardingLayout';
import { GetServerSideProps } from 'next';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getSkillrById } from 'pages/api/skillrs/[skillrId]';
import { SkillrDDto } from 'pages/api/skillrs/me';
import { apiHostFetch } from '@/lib/api-fetch';
import { SkillrLocalAvailabilityDto, SkillrOnboardingSteps } from '@/lib/types/skillr';
import Router from 'next/router';
import StepsController from '@/components/UI/Onboarding/StepsController/StepsController';
import { AvailabilityDates } from '@/components/UI/Availability/AvailabilityDates';
import { UserToken } from '@/lib/types/user';

type SetAvailabilityProps = {
    skillrDDto: SkillrDDto;
    token: UserToken;
};

const SetAvailability: React.FC<SetAvailabilityProps> = ({ skillrDDto, token }) => {
    const [availability, setAvailability] = useState<SkillrLocalAvailabilityDto>(
        skillrDDto.localAvailability || ({} as SkillrLocalAvailabilityDto)
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [availabilityError, setAvailabilityError] = useState<string>('');

    const saveAvailabilityChanges = async () => {
        const payload: { localAvailability: SkillrLocalAvailabilityDto } = {
            localAvailability: {
                ...availability,
                timezoneOffset: new Date().getTimezoneOffset(),
                type: skillrDDto.availabilityType,
            },
        };

        setIsLoading(true);

        try {
            const data = await apiHostFetch('/api/app/skillrs', {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.jwt}`,
                },
            }).then((res) => res.json());

            if (data.id) {
                Router.push(`/onboarding/skillr/steps/payout`);
            } else {
                setAvailabilityError(data.errors?.[0]?.messages?.[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const isAnyDateAvailable = Object.keys(availability).some(
        (key) => key.startsWith('day') && !!availability[key as keyof SkillrLocalAvailabilityDto]
    );

    return (
        <OnboardingLayout>
            <div className="pt-5 pb-9">
                <div className="w-full">
                    <div className="flex px-4 flex-col items-center">
                        <h2 className="font-semibold mb-1 text-xl md:text-3xl text-center">Availability</h2>
                        <p className="text-sm text-center">
                            Complete all required fields below. Don&apos;t worry, you can always change them later.
                        </p>
                    </div>
                    <hr className="my-4 md:my-5" />
                    <div className="px-4 md:px-10">
                        <div className="w-full max-w-[690px] mx-auto flex flex-col items-center space-y-5 md:space-y-5">
                            <h3 className="text-center font-bold text-xl">When are you generally online?</h3>
                            <p className="text-center text-rich-blue-7 text-base">
                                Tap on a day below to pick a time slot. You&apos;ll be able to receive booking requests
                                within that schedule.
                            </p>
                            <div className="w-full md:max-w-[278px]">
                                <AvailabilityDates
                                    isEditing
                                    availability={availability}
                                    setAvailability={setAvailability}
                                />
                            </div>
                            {!!availabilityError && (
                                <p className="text-skillr-pink text-center text-xs">{availabilityError}</p>
                            )}
                            <div className="w-full">
                                <div className="mt-12">
                                    <StepsController
                                        current={SkillrOnboardingSteps.SET_AVAILABILITY}
                                        isNextDisabled={!isAnyDateAvailable}
                                        isNextLoading={isLoading}
                                        onNextClick={saveAvailabilityChanges}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default SetAvailability;

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
        props: { skillrDDto: skillr, token },
    };
};
