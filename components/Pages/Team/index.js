import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Teams.module.css';
import { Footer } from '@/components/UI/Footer/Footer';
import aboutTeam from '../../../public/about-team.png';
import { DownloadApp } from '@/components/UI/DownloadApp/DownloadApp';
import classNames from 'classnames';
import Bio from './Bio';

import arrowNext from '../../../public/icons/arrow-right.svg';
import arrowPrev from '../../../public/icons/arrow-left.svg';

import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { dt_crew2, dt_advisors, dt_directors, dt_crew } from './BioData';
import Image from 'next/image';

const NextArrow = ({ className, onClick, currentSlide, ctStyle, slideCount }) => {
    return (
        <img
            src={arrowNext.src}
            className={classNames(className, styles.arrowNextStyle)}
            style={{ ...ctStyle, display: currentSlide === slideCount - 1 ? 'none' : 'block' }}
            alt="Next Arrow"
            onClick={onClick}
        />
    );
};

const PrevArrow = ({ className, onClick, currentSlide, ctStyle }) => {
    return (
        <img
            src={arrowPrev.src}
            className={classNames(className, styles.arrowPrevStyle)}
            style={{ ...ctStyle, display: currentSlide === 0 ? 'none' : 'block' }}
            alt="Prev Arrow"
            onClick={onClick}
        />
    );
};

export default function Teams() {
    const [isActive, setActive] = useState(1);

    const settings = {
        dots: false,
        infinite: false,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <NextArrow ctStyle={{ width: '20px', height: '40px' }} />,
        prevArrow: <PrevArrow ctStyle={{ width: '20px', height: '40px' }} />,
    };

    return (
        <div className={styles.teams}>
            <main className={styles.main}>
                <div className={classNames(styles.aboutTeam, 'desktop w-screen relative h-[585px]')}>
                    <Image layout="fill" objectFit="cover" src={aboutTeam.src} alt="About Team" />
                </div>

                <div className={styles.container}>
                    <div className={styles.navTab}>
                        <div
                            className={classNames(styles.tabLink, isActive == 1 && styles.active)}
                            onClick={() => setActive(1)}
                        >
                            <Link href="#meet-crew">Meet the Crew</Link>
                        </div>
                        <div
                            className={classNames(styles.tabLink, isActive == 2 && styles.active)}
                            onClick={() => setActive(2)}
                        >
                            <Link href="#board-director">Board of Directors</Link>
                        </div>
                        <div
                            className={classNames(styles.tabLink, isActive == 3 && styles.active)}
                            onClick={() => setActive(3)}
                        >
                            <Link href="#board-advisor">Board of Advisors</Link>
                        </div>
                    </div>

                    <div
                        id="meet-crew"
                        // style={{ display: isActive == 1 ? "block" : "none" }}
                    >
                        <div className={classNames(styles.bioWrapper, 'desktop')}>
                            {dt_crew.map((crew, index) => (
                                <Bio
                                    size={crew.size}
                                    img={crew.img}
                                    hoverImg={crew.hoverImg}
                                    name={crew.name}
                                    skill={crew.skill}
                                    body={crew.body}
                                    key={index}
                                />
                            ))}
                        </div>

                        <div className={classNames(styles.bioWrapper, 'tablet')}>
                            <Carousel {...settings}>
                                {dt_crew.map((crew, index) => (
                                    <Bio
                                        size={crew.size}
                                        img={crew.img}
                                        hoverImg={crew.hoverImg}
                                        name={crew.name}
                                        skill={crew.skill}
                                        body={crew.body}
                                        key={index}
                                    />
                                ))}
                                {dt_crew2.map((crew, index) => (
                                    <Bio
                                        size="big"
                                        img={crew.img}
                                        name={crew.name}
                                        skill={crew.skill}
                                        body={crew.body}
                                        key={index}
                                    />
                                ))}
                            </Carousel>
                        </div>

                        <div className={classNames(styles.bioWrapper, styles.ctMargin, 'desktop')}>
                            <div className={styles.flexContainer}>
                                {dt_crew2.map((crew, index) => (
                                    <Bio
                                        size={crew.size}
                                        isHover={crew.isHover}
                                        img={crew.img}
                                        name={crew.name}
                                        skill={crew.skill}
                                        body={crew.body}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div
                        id="board-director"
                        // style={{ display: isActive == 2 ? "block" : "none" }}
                    >
                        <h3 className={classNames(styles.textCenter, styles.ctMargin)}>Board of Directors</h3>
                        <div className={classNames(styles.bioWrapper, 'desktop')}>
                            {dt_directors.map((director, index) => (
                                <Bio
                                    size={director.size}
                                    img={director.img}
                                    name={director.name}
                                    skill={director.skill}
                                    body={director.body}
                                    key={index}
                                />
                            ))}
                        </div>
                        <div className={classNames(styles.bioWrapper, 'tablet')}>
                            <Carousel {...settings}>
                                {dt_directors.map((director, index) => (
                                    <Bio
                                        size={director.size}
                                        img={director.img}
                                        name={director.name}
                                        skill={director.skill}
                                        body={director.body}
                                        key={index}
                                    />
                                ))}
                            </Carousel>
                        </div>
                    </div>

                    <div
                        id="board-advisor"
                        // style={{ display: isActive == 3 ? "block" : "none" }}
                    >
                        <h3 className={classNames(styles.textCenter, styles.ctMargin)}>Board of Advisors</h3>
                        <div className={classNames(styles.advisorWrapper, styles.ctMargin, 'desktop')}>
                            <div className={classNames(styles.flexContainer, styles.justifyEvenly)}>
                                {dt_advisors.map((advisor, index) => (
                                    <Bio
                                        size={advisor.size}
                                        isHover={advisor.isHover}
                                        img={advisor.img}
                                        name={advisor.name}
                                        skill={advisor.skill}
                                        body={advisor.body}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className={classNames(styles.advisorWrapper, styles.ctMargin, 'tablet')}>
                            <Carousel {...settings}>
                                {dt_advisors.map((advisor, index) => (
                                    <Bio
                                        size="big"
                                        img={advisor.img}
                                        name={advisor.name}
                                        skill={advisor.skill}
                                        body={advisor.body}
                                        key={index}
                                    />
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.getEarlyAccess}>
                        <h3 className={classNames('desktop', styles.textCenter, styles.bottomDownloadDescription)}>
                            Get early access
                        </h3>
                        <DownloadApp
                            description={
                                <>
                                    <span className="desktop">Sign up below to receive exclusive invite.</span>
                                </>
                            }
                            imgHidden
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
