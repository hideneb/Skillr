import Image from 'next/image';
import React from 'react';
import styles from './SuccessPage.module.css';
const logoTextBlackIcon = '/logo-black-text.svg';

export const SuccessPage = () => {
    return (
        <div className={styles.SuccessPage}>
            <div>
                <Image width={73} height={102} src={logoTextBlackIcon} alt="Logo" />
                <h1 className={styles.Heading}>You&apos;re on the list.</h1>
                <p>Check your email to confirm in a few minutes.</p>
            </div>
        </div>
    );
};
