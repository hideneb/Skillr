import React, { useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export default function Navbar({ page, useMobileMenu }) {
  const { query } = useRouter();
  const [open, setOpen] = useState(false);

  let autoResize = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', autoResize);
    autoResize();
  }, []);

  return (
    <div className={classNames(styles.navbar, { [styles.open]: open })}>
      <div className={page === 'team' ? classNames(styles.navbarContainer, styles.team) : styles.navbarContainer}>
        <div className={styles.navbarMain}>
          <Link href="https://skillr.com" passHref>
            <img src={'/logo-navbar.svg'} className={styles.mobileLogo} alt="" />
          </Link>
          <div className={classNames({ [styles.mobile]: !useMobileMenu })}>
            <div className={styles.hamburgerIcon} onClick={() => setOpen(!open)}>
              <span></span>
            </div>
          </div>
          {!useMobileMenu && (
            <div className={styles.desktop}>
              <div className={styles.navbarLink}>
                <div className={styles.link}>
                  <Link href="https://www.skillr.com/become-a-skillr" scroll={false}>
                    Become a Skillr
                  </Link>
                </div>
                <div className={styles.link}>
                  <Link href="https://www.skillr.com/about" scroll={false}>
                    About Us
                  </Link>
                </div>
                <div className={styles.link}>
                  <Link href="https://www.skillr.com/team" scroll={false}>
                    Team
                  </Link>
                </div>
                <div className={styles.link}>
                  <Link href="https://skillrhelp.zendesk.com/hc/en-us" scroll={false}>
                    Help
                  </Link>
                </div>
                <div className={styles.link}>
                  <Link href="https://www.skillr.com/jobs" scroll={false}>
                    Jobs
                  </Link>
                </div>
              </div>
            </div>
          )}
          <div className={classNames(styles.mobileMenu)}>
            <div className={styles.mobileLink}>
              <div className={styles.link}>
                <Link href={{ pathname: '/become-skillr', query }} scroll={false}>
                  Become a Skillr
                </Link>
              </div>
              <div className={styles.link}>
                <Link href={{ pathname: '/about-us', query }} scroll={false}>
                  About Us
                </Link>
              </div>
              <div className={styles.link}>
                <Link href={{ pathname: '/team', query }} scroll={false}>
                  Team
                </Link>
              </div>
              <div className={styles.link}>
                <Link href="https://skillrhelp.zendesk.com/hc/en-us" scroll={false}>
                  Help
                </Link>
              </div>
              <div className={styles.link}>
                <Link href="https://skillr.applytojob.com/apply" scroll={false}>
                  Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
