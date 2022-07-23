import React from 'react';
import styles from './Hero.module.css';
import screensImage from '../../../public/hero-screens.png';
import screensMobileImage from '../../../public/hero-mobile.png';
import Image from 'next/image';
import classNames from 'classnames';

const Hero = () => (
    <div className={styles.container}>
        <div>
            <div className={classNames('text-left', styles.curPointer)}>
                <Image width={86} height={118} src="/logo.svg" alt="Skillr Logo" />
            </div>
            <h1 className={styles.title}>Whatever You Want to Learn, Whenever You Want to Learn It</h1>
            <p className={styles.description}>
                Speak to real people, real quick with{' '}
                <span className={styles.block}>one-to-one video call skill-sharing sessions.</span>
            </p>
            <div className={styles.screens}>
                <div className={styles.screensDesktop}>
                    <Image width={665} height={332} src={screensImage.src} layout="fixed" alt="Skillr screens" />
                </div>
                <div className={styles.screensMobile}>
                    <Image width={177} height={133} src={screensMobileImage.src} layout="fixed" alt="Skillr screens" />
                </div>
            </div>
        </div>
    </div>
);

export default Hero;
