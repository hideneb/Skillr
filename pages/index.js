import { useCallback, useRef } from "react";
import Head from "next/head";
import classNames from "classnames";
import DownloadApp from "../components/DownloadApp";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";
import discoverImage from "../public/screenshot-1.jpg";
import connectImage from "../public/screenshot-2.jpg";
import becomeImage from "../public/screenshot-3.png";
import Footer from "../components/Footer";
import Section from "../components/Section/Section";
import Link from "next/link";

export default function Home() {
  const inviteRef = useRef(null);

  const handleGetInviteClicked = useCallback(() => {
    inviteRef.current.scrollIntoView();
    inviteRef.current.focus();
  }, []);

  return (
    <div>
      <Head>
        <title>Skillr</title>
        <meta name="description" content="Skillr" />
        <link
          rel="preload"
          href="/fonts/RedHatDisplay/RedHatDisplay-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />

      <main className={styles.main}>
        <h2 className={styles.skillsOnTap}>Skills on tap</h2>
        <p className={styles.accessible}>
          Want to tap into the minds of tutors, cooks, musicians and more? From
          sketchers to stretchers, top crafters to tech-heads, there’s a world
          of people ready to share what they know.
        </p>
        <DownloadApp
          ref={inviteRef}
          description="A limited number of exclusive invites are primed and ready to go. Want one?"
        />

        <Section
          image={discoverImage.src}
          altText="Get one-on-one with skillful people"
          title="Get one-on-one with skillful people"
          description={
            <>
              <p>
                Trying your hand at DIY? Got that awkward essay to write? Want
                to flex it up with some yoga? Or, y&apos;know, whatever else
                you&apos;re up to... In a matter of moments, you could be
                talking to a real life pro who&apos;ll take you through it and
                teach you what you need to know. Yep, actually talking to them.
              </p>
              <button
                className={classNames(styles.getInvite, styles.desktop)}
                onClick={handleGetInviteClicked}
              >
                Get Invite
              </button>
            </>
          }
        />

        <Section
          image={connectImage.src}
          altText="Grab an instant boost when you run out of brain"
          title="Grab an instant boost when you run out of brain"
          description={
            <p>
              Stop getting stuck on stuff. If you&apos;ve hit a wall while right
              in the middle of something and need some inspo, if you&apos;ve
              suddenly been struck by a glaring gap in your knowledge, or
              you&apos;ve just left it super last minute, you can connect to an
              expert Skillr. Like, right there and then. Instantly. With a
              single tap.
            </p>
          }
          flip
        />

        <Section
          image={becomeImage.src}
          altText="Flip it, reverse it and make money sharing what you know"
          title="Flip it, reverse it and make money sharing what you know"
          description={
            <>
              <p className={styles.noMargin}>
                Got your own skills? Well we&apos;ve got a whole app-load of
                users wanting to get their hands on you. Grab some cash from
                your know-how in fitness, sport, beauty, languages, cooking,
                DIY, tech, and pretty much anything else. Just think how many
                new skills YOU could learn with all that sweet Skillr dough.
              </p>
              <p className={styles.waitMore}>
                Wait there is{" "}
                <Link href="/become-skillr" passHref>
                  <span className={styles.more}>more…</span>
                </Link>
              </p>
            </>
          }
        />

        <div className={styles.getEarlyAccess}>
          <h3
            className={classNames(
              styles.textCenter,
              styles.bottomDownloadDescription
            )}
          >
            Be the first to skill up with early access
          </h3>
          <DownloadApp description="That's right, you could get to use Skillr before anyone else. What outrageous favors must you do for us to get a super exclusive early access invite?! Just drop your email in and we'll send you one. Yeah, that's all." />
        </div>
      </main>

      <Footer />
    </div>
  );
}
