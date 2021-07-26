import React from "react";
import Image from "next/image";
import styles from "./DownloadApp.module.css";

const DownloadApp = () => (
  <div className={styles.container}>
    <a><Image src="/appstore.png" alt="App Store" width={157} height={52} /></a>
    <a><Image src="/googleplay.png" alt="Google Play" width={176} height={52} /></a>
  </div>
)

export default DownloadApp;