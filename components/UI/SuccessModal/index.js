import React from 'react';
import styles from './Modal.module.css';
import IconClose from '../../../public/icons/icon-close.svg';
import Lottie from 'lottie-react';
import logo_animation_data from '../../../public/lottie-logo/skillr_logo.json';

export default function SuccessModal({ show, onClose }) {
    if (!show) return null;

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modal}>
                <button onClick={onClose} className={styles.closeIcon}>
                    <img src={IconClose.src} alt="Modal Close" className={styles.cursorPointer} />
                </button>
                <div className={styles.modalContent}>
                    <Lottie
                        autoplay
                        loop={false}
                        animationData={logo_animation_data}
                        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                        style={{ width: 250, height: 270 }}
                    />
                    <div className={styles.contentBox}>
                        <h2 className={styles.listTitle}>You&#39;re on the list!</h2>
                        <p className={styles.listDescription}>Check your email to confirm in a few minutes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
