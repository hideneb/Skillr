import React from 'react';
import OnboardingLayout from '@/components/UI/Onboarding/OnboardingLayout/OnboardingLayout';
import StepsController from '@/components/UI/Onboarding/StepsController/StepsController';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { SkillrOnboardingSteps } from '@/lib/types/skillr';
import { PayoutMethod, StripeAccountStatus, StripeLink } from '@/lib/types/stripe';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Router from 'next/router';
import { getMySkillr, SkillrDDto } from 'pages/api/skillrs/me';
import { createPaymentInfo } from 'pages/api/skillrStripe/payment-info';
import { getPayoutMethod } from 'pages/api/skillrStripe/payout-method';
import { getStripeLoginLink } from 'pages/api/skillrStripe/stripe-login-link';

type SetupPayoutProps = {
    skillrDDto: SkillrDDto;
    accountLink: StripeLink | null;
    stripeLoginLink: StripeLink | null;
    payoutMethod: PayoutMethod | null;
};

const SetupPayout: React.FC<SetupPayoutProps> = ({ accountLink, payoutMethod, stripeLoginLink }) => {
    const setUpStripe = () => {
        if (stripeLoginLink) {
            window.open(stripeLoginLink?.url, '_self');
            return;
        }

        if (accountLink) {
            window.open(accountLink?.url, '_self');
        }
    };

    return (
        <OnboardingLayout>
            <div className="pt-5 pb-9 md:pb-12">
                <div className="w-full">
                    <div className="flex px-4 flex-col items-center">
                        <h2 className="font-semibold mb-1 text-xl md:text-3xl text-center">
                            Payout settings - Set up Stripe, get paid
                        </h2>
                        <p className="text-sm mt-2 text-center">
                            Stripe is a payment processing platform used by Lyft, Amazon, Slack, Glossier, Shopify and
                            Airbnb.
                        </p>
                    </div>
                    <hr className="my-4 md:my-5" />
                    <div className="px-4 md:px-10">
                        <div className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-5 md:space-y-5">
                            <div className="flex flex-col items-center md:items-start md:flex-row pt-1 w-full justify-between md:space-x-14 space-y-5 md:space-y-0">
                                <div className="w-full md:w-[391px] mt-5 flex-shrink-0 relative h-[154px] md:h-[212px]">
                                    <Image src="/skillr-bucks.png" alt="skillr-bucks" objectFit="cover" layout="fill" />
                                </div>
                                <div className="flex flex-col items-center md:items-start">
                                    <p className="text-base font-bold">For Skillr to work you&apos;ll need to:</p>
                                    <ul className="text-rich-blue-7 list-disc list-outside pl-6 mt-3">
                                        <li>
                                            On <b>BUSINESS TYPE</b>, select &apos;individual&apos;
                                        </li>
                                        <li>
                                            When you get to the <b>INDUSTRY</b> field, click &apos;consulting&apos;
                                        </li>
                                        <li>
                                            Under the <b>WEBSITE</b> field, you can enter www.skillr.com (if you
                                            don&apos;t have your own site)
                                        </li>
                                    </ul>
                                    <div className="pt-8 w-full space-y-5">
                                        {!payoutMethod && (
                                            <div className="flex items-center fixed bottom-0 w-full z-10 left-0 p-4 md:p-0 bg-white md:bg-transparent md:static shadow-skillr-lg md:shadow-none pt-4 justify-center">
                                                <button
                                                    onClick={setUpStripe}
                                                    className="w-full max-w-[327px] h-[52px] rounded-lg text-white bg-skillr-pink font-semibold"
                                                >
                                                    Got it, ready to setup Stripe
                                                </button>
                                            </div>
                                        )}
                                        <p
                                            className={classNames('text-center text-sm', {
                                                'text-gray-400': !payoutMethod,
                                                'text-green-500 font-bold': !!payoutMethod,
                                            })}
                                        >
                                            {payoutMethod ? 'Stripe is set up!' : 'Please complete every field.'}
                                        </p>

                                        {payoutMethod && (
                                            <StepsController
                                                current={SkillrOnboardingSteps.SETUP_PAYOUT}
                                                onNextClick={() => Router.push(`/onboarding/skillr/steps/success`)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default SetupPayout;

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

    const skillr = await getMySkillr(token.jwt);

    const accountLink = await createPaymentInfo(token.jwt);

    const stripeLoginLink =
        skillr.stripeAccountId && skillr.stripeAccountStatus !== StripeAccountStatus.ENABLED
            ? await getStripeLoginLink(token.jwt)
            : null;

    const payoutMethod =
        skillr.stripeAccountId && skillr.stripeAccountStatus === StripeAccountStatus.ENABLED
            ? await getPayoutMethod(token.jwt)
            : null;

    return {
        props: {
            skillrDDto: skillr,
            accountLink: accountLink?.url ? accountLink : null,
            stripeLoginLink: stripeLoginLink?.url ? stripeLoginLink : null,
            payoutMethod,
        },
    };
};
