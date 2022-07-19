import React from 'react';
import styles from './Footer.module.css';

import logoTextBlackIcon from '../../../public/logo-black-text.svg';

const SimpleFooter = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.logo}>
          <img src={logoTextBlackIcon.src} alt="" />
          <p className={styles.copyright}>© 2022 Skillr, Inc.</p>
        </div>
      </div>
    </footer>
  );
};
export default SimpleFooter;
