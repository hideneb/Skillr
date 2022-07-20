import styles from './ConnectNow.module.css';

export function ConnectNow() {
    return (
        <a
            href="https://apps.apple.com/us/app/skillr-learn-from-an-expert/id1574736206"
            target="_blank"
            rel="noreferrer"
        >
            <button className={styles.connectNowButton}>Connect Now</button>
        </a>
    );
}
