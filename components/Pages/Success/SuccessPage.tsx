import React from 'react';
import styles from './SuccessPage.module.css';
import logoTextBlackIcon from '../../../public/logo-black-text.svg';

export const SuccessPage = () => {
    return (
        <div className={styles.SuccessPage}>
            <div>
                <img src={logoTextBlackIcon.src} alt="Logo" />
                <h1 className={styles.Heading}>You&apos;re on the list.</h1>
                <p>Check your email to confirm in a few minutes.</p>
            </div>
        </div>
    );
};
