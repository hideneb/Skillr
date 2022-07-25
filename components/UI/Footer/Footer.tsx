import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const Footer = () => {
    const { query } = useRouter();
    return (
        <footer
            className="w-full grid grid-cols-6 p-4 md:p-8 gap-4 md:gap-8 max-w-[1444px] mx-auto"
            style={{
                color: 'var(--rich-blue-8)',
            }}
        >
            <div className="col-span-6 md:col-span-4">
                <Image height={40} width={40} src="/logo-black-text.svg" alt="Skillr" />
                <p className="text-xs ml-1 mt-1">Copyright SKILLR, Inc. © 2022 All Rights Reserved</p>
            </div>
            <div className="col-span-3 md:col-span-1">
                <h4 className="text-2xl font-bold">Connect</h4>
                <ul className="mt-2 md:mt-6">
                    <li className="underline mt-2 md:mt-4">
                        <Link href={'/'}>Help</Link>
                    </li>
                    <li className="underline mt-2 md:mt-4">
                        <Link href={'/'}>Terms of Service</Link>
                    </li>
                    <li className="underline mt-2 md:mt-4">
                        <Link href={'/'}>Privacy Policy</Link>
                    </li>
                    <li className="underline mt-2 md:mt-4">
                        <Link href={'/'}>Contact</Link>
                    </li>
                </ul>
            </div>
            <div className="col-span-3 md:col-span-1">
                <h4 className="text-2xl font-bold">Follow</h4>
                <ul className="mt-2 md:mt-6">
                    <li className="underline mt-2 md:mt-4">
                        <Link href={'/'}>Facebook</Link>
                    </li>
                    <li className="underline mt-2 md:mt-4">
                        <Link href={'/'}>Instagram</Link>
                    </li>
                    <li className="underline mt-2 md:mt-4">
                        <Link href={'/'}>Twitter</Link>
                    </li>
                    <li className="underline mt-2 md:mt-4">
                        <Link href={'/'}>LinkedIn</Link>
                    </li>
                </ul>
            </div>
            {/* <div>
                <div className={styles.logo}>
                    <Image width={73} height={102} src={logoTextBlackIcon} alt="" />
                    <p className={styles.copyright}>© 2022 Skillr, Inc.</p>
                </div>

                <div className={styles.navbarBox}>
                    <div className={styles.navbar}>
                        <div className={styles.link}>
                            <Link href={{ pathname: '/', query }} scroll={false}>
                                Home
                            </Link>
                        </div>
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
            </div> */}
        </footer>
    );
};
