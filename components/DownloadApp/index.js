import React from "react";
import Image from "next/image";
import styles from "./DownloadApp.module.css";

import appstoreImage from "../../public/appstore-coming.png";

const DownloadApp = () => (
  <div className={styles.container}>
    <Image src={appstoreImage} alt="App Store Coming Soon" />
    <p className={styles.description}>
      Sign up below to receive exclusive invite.
    </p>

    <div className={styles.inviteContainer}>
      <input className={styles.input} placeholder="Enter email..." />
      <button className={styles.button}>Get Invite</button>
    </div>
  </div>
);

export default DownloadApp;
