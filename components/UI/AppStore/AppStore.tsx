import Image from 'next/image';
import React from 'react';
import styles from './AppStore.module.css';

export const AppStore = () => {
    return (
        <a
            href="https://apps.apple.com/us/app/skillr-learn-from-an-expert/id1574736206"
            target="_blank"
            rel="noreferrer"
            className={styles.appStore}
        >
            <div className={`${styles.text} font-semibold text-gray-600 text-center`}>
                Get the full experience on the Skillr app
            </div>
            <div className="md:mb-1">
                <Image
                    width={148}
                    height={48}
                    className={styles.badge}
                    src="/app-store-badge.svg"
                    alt="Download on the App Store"
                />
            </div>
        </a>
    );
};
