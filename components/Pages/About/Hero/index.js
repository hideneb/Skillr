import React from 'react';
import classNames from 'classnames';
import screenImage from '../../../../public/about-us-screen1.png';
import styles from './Hero.module.css';
import Image from 'next/image';

export default function Hero() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <h1>Meet Skillr</h1>
                    <p className={styles.fontBold}>
                        We&apos;re your connect for one-on-one live video chatting with experts anytime for whatever
                        life throws at you. An app where you&apos;re getting coached, get answers, or be entertained{' '}
                        <span className={styles.fontItalic}>right now, one-on-one, and by the minute.</span>
                    </p>
                    <p className={classNames('desktop', styles.fontBold)}>
                        That&apos;s right, we&apos;re your one-stop shop with SKILL ON TAP
                        <sup className="tm">TM</sup>
                        so you can KNOW HOW RIGHT NOW
                        <sup className="tm">TM</sup>.
                    </p>
                    <p className={classNames('desktop', styles.fontBold)} style={{ marginTop: '33px' }}>
                        Yup, Skillr just got you video chatting with a pro as easy as getting a cab. You&apos;re
                        welcome. Welcome.
                    </p>
                </div>
                <div className={styles.right}>
                    <div className={classNames('mobileFrame', styles.frame)}>
                        <Image width={280} height={581} src={screenImage.src} alt="Screen" />
                    </div>
                    <p className={classNames('tablet', styles.fontBold)}>
                        That&apos;s right, we&apos;re your one-stop shop with SKILL ON TAP
                        <sup className="tm">TM</sup>
                        so you can KNOW HOW RIGHT NOW
                        <sup className="tm">TM</sup>.
                    </p>
                    <p className={classNames('tablet', styles.fontBold)} style={{ marginTop: '33px' }}>
                        Yup, Skillr just got you video chatting with a pro as easy as getting a cab. You&apos;re
                        welcome. Welcome.
                    </p>
                </div>
            </div>
        </div>
    );
}
