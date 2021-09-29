import React from "react";
import Hero from "./Hero";
import styles from "../../styles/About.module.css";
import Section from "../Section/Section";
import BottomSection from "./BottomSection";
import Footer from "../Footer";
import BannerSection from "./BannerSection";
import fingerImage from "../../public/screenshot-4.jpeg";
import classNames from "classnames";

export default function AboutUs() {
  return (
    <div>
      <Hero />

      <main className={(styles.main, styles.container)}>
        <BannerSection />
        <Section
          image={fingerImage.src}
          altText="Experts at your fingertips"
          title={
            <>
              Experts at your fingertips
              <sup className={classNames("tm")}>TM</sup>
              <p className={styles.stBlockMarginTop}>
                Personalized, on-demand coaching used to be a privilege, but we
                say to hell with that. Everybody deserves access to a network of
                experts. We created Skillr to put them right in your pocket. In
                the middle of perfecting your crow pose or memorizing the chords
                to &#34;Wonderwall?&#34;
              </p>
            </>
          }
          description={
            <>
              <p className={styles.ndBlockMarginTop}>
                Skip the unproductive internet search and open Skillr. Save time
                and money by finding an expert at a moment&#39;s notice. Just
                open the app and find the skill you need. Get to learning, young
                Padawan. Then show off your new skills.
              </p>
            </>
          }
          flip
        />

        <BottomSection
          title={
            <>
              You&apos;ll be saying, &#34;I got a guy
              <sup className={classNames("tm")}>TM</sup>&#34; for everything
              <p className={styles.ndBlockMarginTop}>
                Download the app (we’ll wait). Search for a skill, yoga, tech
                help, writing songs that can climb the charts.
              </p>
              <p className={styles.ndBlockMarginTop}>
                Hit Instant Match, and go (ba da bing, you’re on your way to new
                skills in no time). Chat with the pros, put away your phone, and
                pat yourself on the back for learning something new today.
                Welcome to the Skillr fam, babe.
              </p>
            </>
          }
          description={
            <>
              <p className={styles.ndBlockMarginTop}>
                Have a skill you want to share with the masses? Show us you have
                what it takes to be a Skillr and start raking in the dough. Set
                your own rates and make money moves.
              </p>
              <p className={styles.ndBlockMarginTop}>
                Ready to sign up? Drop your email. We’ll drop you a line.
              </p>
            </>
          }
        />
      </main>

      <Footer />
    </div>
  );
}
