import React, { useRef, useCallback } from 'react';

import classNames from 'classnames';
import styles from './BecomeSkillr.module.css';
import Hero from './Hero';
import { DownloadApp } from '@/components/UI/DownloadApp/DownloadApp';
import Section from '@/components/UI/Section/Section';

import downtimeImage from '../../../public/become-skillr-hero-1.png';
import teachImage from '../../../public/become-skillr-hero-2.png';
import businessImage from '../../../public/become-skillr-hero-3.png';
import { Footer } from '@/components/UI/Footer/Footer';

export default function BecomeSkillr() {
    const inviteRef = useRef(null);

    const handleGetInviteClicked = useCallback(() => {
        inviteRef.current.scrollIntoView();
        inviteRef.current.focus();
    }, []);

    return (
        <div>
            <Hero />

            <main className={styles.main}>
                <h2 className={styles.payTitle}>People want to know what you know, and they&apos;ll pay for it</h2>
                <p className={styles.payDescription}>
                    A community of skill Seekrs looking for fitness sessions, beauty tips, tutoring, culinary technique,
                    home improvement advice and more. So if you&apos;ve got some knowledge, you&apos;ve got a money
                    maker. Forget creating and uploading awkward tutorial videos, these are one-to-one, real
                    conversations making it easy for you to chat things through, gauge what level they&apos;re at and
                    genuinely help them.
                </p>

                <h3 className={styles.downloadTitle}>Start building your rep and earning cash with early access.</h3>
                <DownloadApp ref={inviteRef} />

                <Section
                    image={downtimeImage.src}
                    altText="Turn your downtime into $$$"
                    title={
                        <>
                            Turn your downtime into $$$
                            <p style={{ marginTop: 28 }}>
                                Taking a break, travelling, just need something to do in the evenings? You decide your
                                own availability on Skillr with no minimum or maximum commitments so you can turn any
                                moment into money, sharing your skills and knowledge with someone in a video call.
                            </p>
                        </>
                    }
                    description={
                        <>
                            <button
                                className={classNames(styles.makeMoney, styles.desktop)}
                                onClick={handleGetInviteClicked}
                            >
                                Make some money
                            </button>
                        </>
                    }
                    flip
                />

                <Section
                    image={teachImage.src}
                    altText="Meet interesting people and teach them"
                    title="Meet interesting people and teach them"
                    description={
                        <>
                            <p style={{ marginTop: 28 }}>
                                Teaching a skill helps you get even better at it but also, it&apos;s fun and feel-good.
                                You get to meet people from all over and genuinely help them out by simply sharing the
                                things you know. For most, being a Skillr isn&apos;t just about the money, it&apos;s
                                also about the enjoyment.
                            </p>
                        </>
                    }
                    style={{ textAlign: 'right' }}
                />

                <Section
                    image={businessImage.src}
                    altText="Reach new clients for your business"
                    title="Reach new clients for your business"
                    description={
                        <>
                            <p style={{ marginTop: 28 }}>
                                Whether you&apos;re a personal trainer or a tech support pro, you can only find so many
                                clients locally. Now Skillr opens up a channel for you to get new and regular one-to-one
                                clients from anywhere in the world. Or use it to supplement your business with a new
                                kind of service.
                            </p>
                        </>
                    }
                    flip
                />

                <div className={styles.getEarlyAccess}>
                    <h3 className={styles.downloadTitle}>Get a head start as a Skillr with early access</h3>
                    <p className={classNames('desktop', styles.downloadDescription)}>
                        That&apos;s right, a select few will get to use Skillr before anyone else. Take advantage to be
                        one of the first Skillrs and start growing your customer base before anyone else even has a
                        chance.
                    </p>
                    <DownloadApp
                        description={
                            <span className={classNames('tablet')}>
                                That&apos;s right, a select few will get to use Skillr before anyone else. Take
                                advantage to be one of the first Skillrs and start growing your customer base before
                                anyone else even has a chance.
                            </span>
                        }
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
