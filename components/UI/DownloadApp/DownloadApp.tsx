// todo: remove nocheck
// @ts-nocheck

import React, { useState, forwardRef } from 'react';
import styles from './DownloadApp.module.css';

import appstoreImage from '../../../public/button-appstore.svg';
import { useRouter } from 'next/router';
import SuccessModal from '@/components/UI/SuccessModal';

export const DownloadApp = forwardRef<any, { description: string }>(({ description, imgHidden }, ref) => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { utm_source, utm_campaign, utm_term, utm_content, utm_medium } = router.query;
        if (email) {
            window.analytics?.identify({
                email,
                utmsrc: utm_source,
                utmcpn: utm_campaign,
                utmterm: utm_term,
                utmcntn: utm_content,
                utmmed: utm_medium,
            });
            setEmail('');
            setShowModal(true);
        }
    };

    return (
        <div className={styles.container}>
            <img src={appstoreImage.src} className={`${!imgHidden ? '' : 'desktop'}`} alt="App Store Coming Soon" />
            <p className={styles.description}>{description}</p>

            <form className={styles.inviteContainer} onSubmit={handleSubmit}>
                <input
                    ref={ref}
                    type="email"
                    className={styles.input}
                    placeholder="Give us your email…"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required
                />
                <button className={styles.button}>Get Invite</button>
            </form>
            <SuccessModal onClose={() => setShowModal(false)} show={showModal} />
        </div>
    );
});

DownloadApp.displayName = 'DownloadApp';
