import React, { useState } from "react";
import Image from "next/image";
import styles from "./DownloadApp.module.css";

import appstoreImage from "../../public/appstore-coming.png";
import { useRouter } from "next/dist/client/router";

const DownloadApp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      window.analytics?.identify({email});
      setEmail('');
    }
    router.push("/success");
  };

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
          onChange={(e) => {setEmail(e.target.value)}}
          required
        />
        <button className={styles.button}>Get Invite</button>
      </form>
    </div>
  );
};

export default DownloadApp;
