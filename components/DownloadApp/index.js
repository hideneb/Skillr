import React, { useState } from "react";
import styles from "./DownloadApp.module.css";

import appstoreImage from "../../public/button-appstore.svg";
import { useRouter } from "next/dist/client/router";

const DownloadApp = ({ description }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { utm_source, utm_campaign, utm_term, utm_content, utm_medium } =
      router.query;
    if (email) {
      window.analytics?.identify({
        email,
        utmsrc: utm_source,
        utmcpn: utm_campaign,
        utmterm: utm_term,
        utmcntn: utm_content,
        utmmed: utm_medium,
      });
      setEmail("");
    }
    router.push("/success");
  };

  return (
    <div className={styles.container}>
      <img src={appstoreImage.src} alt="App Store Coming Soon" />
      <p className={styles.description}>{description}</p>

      <form className={styles.inviteContainer} onSubmit={handleSubmit}>
        <input
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
    </div>
  );
};

export default DownloadApp;
