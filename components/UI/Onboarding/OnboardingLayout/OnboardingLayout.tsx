import Head from 'next/head';
import React, { ReactNode } from 'react';
import styles from './OnboardingLayout.module.css';

interface OnboardingLayoutProps {
    children: ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
    return (
        <>
            <Head>
                <title>Onboarding</title>
                <meta name="description" content="Skillr" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div className={styles.hero} />

                <div className="flex justify-center px-6">
                    <div className="w-full max-w-[963px]">
                        <div className="mt-4 md:mt-12 flex flex-col items-center justify-center">
                            <h2 className="text-xl md:text-4xl mb-2 md:mb-5 text-center font-semibold">
                                Setup your Skillr profile in just a few easy steps
                            </h2>
                            <p className="text-sm text-center">
                                Listing your profile is simple and usually takes about 10 minutes.
                            </p>
                        </div>
                        <hr className="mt-3 md:mt-6 mb-6 md:mb-10" />

                        <div className="rounded-xl shadow-skillr-lg">{children}</div>
                    </div>
                </div>

                <div className="flex mt-16 md:mt-28 mb-10 justify-center">
                    <p className="text-sm">© {new Date().getFullYear()} Skillr, Inc.</p>
                </div>
            </div>
        </>
    );
}
