import React from "react";
import Image from "next/image";
import styles from "./DownloadApp.module.css";

import appstoreImage from "../../public/appstore-coming.png";

const DownloadApp = () => {
  const handleSubmit = () => {};

  return (
    <div className={styles.container}>
      <Image src={appstoreImage} alt="App Store Coming Soon" />
      <p className={styles.description}>
        Sign up below to receive exclusive invite.
      </p>

      <form className={styles.inviteContainer} onSubmit={handleSubmit}>
        <input
          type="email"
          className={styles.input}
          placeholder="Enter email..."
          required
        />
        <button className={styles.button}>Get Invite</button>
      </form>
    </div>
  );
};

export default DownloadApp;
