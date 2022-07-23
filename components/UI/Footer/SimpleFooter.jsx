import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';

const logoTextBlackIcon = '/logo-black-text.svg';

const SimpleFooter = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <div className={styles.logo}>
                    <Image width={73} height={102} src={logoTextBlackIcon} alt="" />
                    <p className={styles.copyright}>© 2022 Skillr, Inc.</p>
                </div>
            </div>
        </footer>
    );
};
export default SimpleFooter;
