import React from 'react';

import becomeSkillr from '../../../../public/become-skillr-screens.png';
import becomeSkillrMobile from '../../../../public/become-skillr-mobile.png';
import styles from './Hero.module.css';
import classNames from 'classnames';
import Image from 'next/image';

export default function Hero() {
    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <div className={classNames('desktop', styles.screens)}>
                    <div className={styles.screensDesktop}>
                        <Image
                            width={1046}
                            height={395}
                            src={becomeSkillr.src}
                            layout="intrinsic"
                            objectFit="cover"
                            objectPosition="center"
                            alt="Screen"
                        />
                    </div>
                    <div className={styles.screensMobile}>
                        <Image width={355} height={412} src={becomeSkillrMobile.src} layout="intrinsic" alt="Screen" />
                    </div>
                </div>
                <div>
                    <h1 className={styles.title}>Share What You&apos;re Good At, Make Money</h1>
                    <p className={styles.description}>
                        Get paid for one-to-one skill-sharing sessions, teaching others what you know.
                    </p>
                </div>
                <div className={classNames('tablet', styles.screens)}>
                    <div className={styles.screensDesktop}>
                        <Image width={1046} height={395} src={becomeSkillr.src} layout="fixed" alt="Screen" />
                    </div>
                    <div className={styles.screensMobile}>
                        <Image width={355} height={412} src={becomeSkillrMobile.src} layout="fixed" alt="Screen" />
                    </div>
                </div>
            </div>
        </div>
    );
}
