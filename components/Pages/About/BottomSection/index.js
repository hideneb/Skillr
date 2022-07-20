import React from 'react';
import classNames from 'classnames';

import styles from './Bottom.module.css';
import { DownloadApp } from '@/components/UI/DownloadApp/DownloadApp';

export default function Section({ title, description }) {
    return (
        <div>
            <h2 className={styles.textCenter}>{title}</h2>
            <div className={classNames('desktop', styles.textCenter)}>{description}</div>

            <div className={styles.getEarlyAccess}>
                <h3 className={classNames('desktop', styles.textCenter, styles.bottomDownloadDescription)}>
                    Get early access
                </h3>
                <DownloadApp
                    description={
                        <>
                            <span className="desktop">Sign up below to receive exclusive invite.</span>
                        </>
                    }
                    imgHidden
                />
            </div>

            <div className={classNames('tablet', styles.textCenter)}>{description}</div>
        </div>
    );
}
