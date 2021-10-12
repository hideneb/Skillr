import React, { useState } from "react";
import Hero from "./Hero";
import styles from "../../styles/About.module.css";
import Section from "../Section/Section";
import BottomSection from "./BottomSection";
import Footer from "../Footer";
import BannerSection from "./BannerSection";
import fingerImage from "../../public/screenshot-4.jpeg";
import aboutTeam from "../../public/about-team.png";
import DownloadApp from "../DownloadApp";
import classNames from "classnames";
import Bio from "../Bio";

import { dt_crew2, dt_advisors, dt_directors, dt_crew } from "./BioData";

export default function About() {
  const [isActive, setActive] = useState(1);

  return (
    <div>
      <Hero />

      <main className={styles.main}>
        <div className={styles.container}>
          <BannerSection />
          <Section
            image={fingerImage.src}
            altText="Experts at your fingertips"
            title={
              <>
                Experts at your fingertips
                <sup className="tm">TM</sup>
                <p className={styles.stBlockMarginTop}>
                  Personalized, on-demand coaching used to be a privilege, but
                  we say to hell with that. Everybody deserves access to a
                  network of experts. We created Skillr to put them right in
                  your pocket. In the middle of perfecting your crow pose or
                  memorizing the chords to &#34;Wonderwall?&#34;
                </p>
              </>
            }
            description={
              <>
                <p className={styles.ndBlockMarginTop}>
                  Skip the unproductive internet search and open Skillr. Save
                  time and money by finding an expert at a moment&#39;s notice.
                  Just open the app and find the skill you need. Get to
                  learning, young Padawan. Then show off your new skills.
                </p>
              </>
            }
            flip
          />

          <BottomSection
            title={
              <>
                You&apos;ll be saying, &#34;I got a guy
                <sup className="tm">TM</sup>&#34; for everything
                <p className={styles.ndBlockMarginTop}>
                  Download the app (we’ll wait). Search for a skill, yoga, tech
                  help, writing songs that can climb the charts.
                </p>
                <p className={styles.ndBlockMarginTop}>
                  Hit Instant Match, and go (ba da bing, you’re on your way to
                  new skills in no time). Chat with the pros, put away your
                  phone, and pat yourself on the back for learning something new
                  today. Welcome to the Skillr fam, babe.
                </p>
              </>
            }
            description={
              <>
                <p className={styles.ndBlockMarginTop}>
                  Have a skill you want to share with the masses? Show us you
                  have what it takes to be a Skillr and start raking in the
                  dough. Set your own rates and make money moves.
                </p>
                <p className={styles.ndBlockMarginTop}>
                  Ready to sign up? Drop your email. We’ll drop you a line.
                </p>
              </>
            }
          />
        </div>

        <div className={classNames(styles.aboutTeam, "desktop")}>
          <img src={aboutTeam.src} alt="About Team" />
        </div>

        <div className={styles.container}>
          <div className={styles.navTab}>
            <div
              className={classNames(
                styles.tabLink,
                isActive == 1 && styles.active
              )}
              onClick={() => setActive(1)}
            >
              <span href="#meet-crew">Meet the Crew</span>
            </div>
            <div
              className={classNames(
                styles.tabLink,
                isActive == 2 && styles.active
              )}
              onClick={() => setActive(2)}
            >
              <span href="#board-director">Board of Directors</span>
            </div>
            <div
              className={classNames(
                styles.tabLink,
                isActive == 3 && styles.active
              )}
              onClick={() => setActive(3)}
            >
              <span href="#board-advisor">Board of Advisors</span>
            </div>
          </div>

          <div
            id="meet-crew"
            style={{ display: isActive == 1 ? "block" : "none" }}
          >
            <div className={styles.bioWrapper}>
              {
                dt_crew.map( crew => (
                  <Bio
                    size={crew.size}
                    img={crew.img}
                    hoverImg={crew.hoverImg}
                    name={crew.name}
                    skill={crew.skill}
                    body={crew.body}
                  />
                ) )
              }
            </div>

            <div className={classNames(styles.bioWrapper, styles.ctMargin)}>
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
            style={{ display: isActive == 2 ? "block" : "none" }}
          >
            {/* <h3 className={classNames(styles.textCenter, styles.ctMargin)}>
              Board of Directors
            </h3> */}
            <div className={styles.bioWrapper}>
              {
                dt_directors.map( director => (
                  <Bio
                    size={director.size}
                    img={director.img}
                    name={director.name}
                    skill={director.skill}
                    body={director.body}
                  />
                ))
              }
            </div>
          </div>

          <div
            id="board-advisor"
            style={{ display: isActive == 3 ? "block" : "none" }}
          >
            {/* <h3 className={classNames(styles.textCenter, styles.ctMargin)}>
              Board of Advisors
            </h3> */}
            <div className={classNames(styles.bioWrapper, styles.ctMargin)}>
              <div className={styles.flexContainer}>
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
          </div>

          <div className={styles.getEarlyAccess}>
            <h3
              className={classNames(
                "desktop",
                styles.textCenter,
                styles.bottomDownloadDescription
              )}
            >
              Get early access
            </h3>
            <DownloadApp
              description={
                <>
                  <span className="desktop">
                    Sign up below to receive exclusive invite.
                  </span>
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
