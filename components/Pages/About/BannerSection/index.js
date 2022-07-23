import React from 'react';
import classNames from 'classnames';

import styles from './Banner.module.css';
import Image from 'next/image';

const hatIcon = '/icons/icon-hat.svg';
const speechIcon = '/icons/icon-speach-bubble.svg';
const bikeIcon = '/icons/icon-bike.svg';
const appleIcon = '/icons/icon-apple.svg';
const dramaIcon = '/icons/icon-drama.svg';
const muscleIcon = '/icons/icon-muscle.svg';
const yogaIcon = '/icons/icon-yoga.svg';

export default function BannerSection() {
    return (
        <>
            <h2 className={styles.prosPocket}>
                Pros in your pocket<sup className="tm">TM</sup>
            </h2>

            <div className={classNames('desktop')}>
                <p className={styles.textCenter}>
                    Help you stay healthy, learn the latest TikTok dance, fix a squeaky cabinet, cook a decadent dessert
                    or whatever you want help with, we got you. In just one click, you can get face time with someone
                    who’s mastered the skill you’re looking to learn. Skillrs are vetted and approved, so you can learn
                    from the best.{' '}
                    <span className={classNames(styles.fontBold, styles.inlineBlock)}>
                        Be impressed. Become impressive.
                    </span>
                </p>

                <div className={styles.iconContainer}>
                    <div className={styles.iconWrapper}>
                        <Image width={80} height={80} src={hatIcon} alt="hat" className={styles.iconItem} />
                        <Image width={80} height={80} src={speechIcon} alt="speech" className={styles.iconItem} />
                        <Image width={80} height={80} src={bikeIcon} alt="bike" className={styles.iconItem} />
                        <Image width={80} height={80} src={appleIcon} alt="apple" className={styles.iconItem} />
                        <Image width={80} height={80} src={dramaIcon} alt="drama" className={styles.iconItem} />
                        <Image width={80} height={80} src={muscleIcon} alt="muscle" className={styles.iconItem} />
                        <Image width={80} height={80} src={yogaIcon} alt="yoga" className={styles.iconItem} />
                    </div>
                </div>
            </div>

            <div className={classNames('tablet', styles.textCenter)}>
                <div className={styles.pocketItem}>
                    <Image width={80} height={80} src={yogaIcon} alt="yoga" />
                    <div className={styles.pocketDescription}>
                        <p>
                            Help you stay healthy, learn the latest TikTok dance, fix a squeaky cabinet, cook a decadent
                            dessert or whatever you want help with, we got you.
                        </p>
                    </div>
                </div>

                <div className={styles.pocketItem}>
                    <Image width={80} height={80} src={hatIcon} alt="hat" />
                    <div className={styles.pocketDescription}>
                        <p>
                            In just one click, you can get face time with someone who’s mastered the skill you’re
                            looking to learn.{' '}
                        </p>
                    </div>
                </div>

                <div className={styles.pocketItem}>
                    <Image width={80} height={80} src={appleIcon} alt="apple" />
                    <div className={styles.pocketDescription}>
                        <p>
                            Skillrs are vetted and approved, so you can learn from the best.{' '}
                            <span className={classNames(styles.fontBold, styles.inlineBlock)}>
                                Be impressed. Become impressive.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
