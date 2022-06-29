import React from 'react';
import BecomeSkillr from '../../components/BecomeSkillr';
import Head from 'next/head';

export default function BecomeSkillrPage() {
    return (
        <div>
            <Head>
                <title>Become a Skillr | Skillr</title>
                <meta name="description" content="Skillr" />
                <link rel="preload" href="/fonts/Poppins/Poppins-Regular.ttf" as="font" crossOrigin="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BecomeSkillr />
        </div>
    );
}
