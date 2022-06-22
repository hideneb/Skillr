import React from "react";
import styles from "./AppStore.module.css";

const AppStore = () => {
	return (
		<div className={styles.appStore}>
			<div className={styles.text}>Get the full experience on the Skillr app</div>
			<img className={styles.badge} src="/app-store-badge.svg" alt="Download on the App Store" />
		</div>
	);
};

export default AppStore;
