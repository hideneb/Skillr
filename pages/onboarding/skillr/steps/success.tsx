import React from 'react';
import OnboardingLayout from '@/components/UI/Onboarding/OnboardingLayout/OnboardingLayout';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getSkillrById } from 'pages/api/skillrs/[skillrId]';
import { AppStore } from '@/components/UI/AppStore/AppStore';

type OnboardingSuccessProps = {};

const OnboardingSuccess: React.FC<OnboardingSuccessProps> = () => {
    return (
        <OnboardingLayout>
            <div className="pt-5 pb-9 px-5 md:px-9">
                <h2 className="md:hidden font-semibold mb-1 text-lg text-center">
                    Congrats, you&apos;re a Skillr now! <br />
                    So glad we made it official.
                </h2>
                <div className="w-full flex flex-col md:flex-row items-center justify-center md:space-x-12">
                    <div className="w-[221px] md:w-[308px] flex-shrink-0 h-[276px] md:h-[385px] relative">
                        <Image objectFit="cover" alt="onboarding-success" layout="fill" src="/onboarding-success.png" />
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="hidden md:block font-semibold mb-1 text-3xl text-center">
                            Congrats, you&apos;re a Skillr now! <br />
                            So glad we made it official.
                        </h2>
                        <p className="text-sm md:text-base md:mt-6 max-w-[350px] text-rich-blue-7 text-center">
                            We&apos;re happy dancing on your behalf and can&apos;t wait for you to meet your first
                            customers. Ready to get this party started?
                        </p>

                        <div className="flex md:mt-12 space-x-6 items-center fixed bottom-0 w-full md:w-auto z-10 left-0 p-4 md:p-0 bg-white md:bg-transparent md:static shadow-skillr-lg md:shadow-none pt-4 justify-center">
                            <AppStore />
                        </div>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default OnboardingSuccess;

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
