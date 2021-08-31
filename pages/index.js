import Head from "next/head";
import classNames from "classnames";
import DownloadApp from "../components/DownloadApp";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";
import discoverImage from "../public/screenshot-1.jpg";
import connectImage from "../public/screenshot-2.jpg";
import becomeImage from "../public/screenshot-3.jpg";
import Footer from "../components/Footer";

export default function Home() {
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
        <p className={styles.accessible}>
          Skills on tap Stop wasting time trying to google it.
        </p>
        <p className={styles.accessible}>
          Want to tap into the minds of tutors, cooks, musicians and more? From
          sketchers to stretchers, top crafters to tech-heads, there’s a world
          of people ready to share what they know.
        </p>
        <DownloadApp description="A limited number of exclusive invites are primed and ready to go. Want one?" />

        <div className={styles.section}>
          <div className={styles.section__right}>
            <div>
              <img
                src={discoverImage.src}
                alt="Get one-on-one with skillful people"
              />
            </div>
          </div>
          <div className={styles.section__left}>
            <div>
              <h2>Get one-on-one with skillful people</h2>
              <p>
                Trying your hand at DIY? Got that awkward essay to write? Want
                to flex it up with some yoga? Or, y&apos;know, whatever else
                you&apos;re up to... In a matter of moments, you could be
                talking to a real life pro who&apos;ll take you through it and
                teach you what you need to know. Yep, actually talking to them.
              </p>
              <button className={styles.getInvite}>Get Invite</button>
            </div>
          </div>
        </div>

        <div className={classNames(styles.section, styles.sectionConnect)}>
          <div className={styles.section__right}>
            <div>
              <img
                src={connectImage.src}
                alt="Grab an instant boost when you run out of brain"
              />
            </div>
          </div>
          <div className={styles.section__left}>
            <div>
              <h2>Grab an instant boost when you run out of brain</h2>
              <p>
                Stop getting stuck on stuff. If you&apos;ve hit a wall while
                right in the middle of something and need some inspo, if
                you&apos;ve suddenly been struck by a glaring gap in your
                knowledge, or you&apos;ve just left it super last minute, you
                can connect to an expert skillr. Like, right there and then.
                Instantly. With a single tap.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.section__right}>
            <div>
              <img
                src={becomeImage.src}
                alt="Flip reverse it and make money sharing what you know"
              />
            </div>
          </div>
          <div className={styles.section__left}>
            <div>
              <h2>Flip reverse it and make money sharing what you know</h2>
              <p>
                Got your own skills? Well we&apos;ve got a whole app-load of
                users wanting to get their hands on you. Grab some cash from
                your know-how in fitness, sport, beauty, languages, cooking,
                DIY, tech, and pretty much anything else. Just think how many
                new skills YOU could learn with all that sweet skillr dough.
              </p>
              <p>
                Wait there is <span className={styles.more}>more…</span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.getEarlyAccess}>
          <h2 className={styles.textCenter}>
            Be the first to skill up with early access
          </h2>
          <DownloadApp description="That's right, you could get to use Skillr before anyone else. What outrageous favours must you do for us to get a super exclusive early access invite?! Just drop your email in and we'll send you one. Yeah, that's all." />
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
