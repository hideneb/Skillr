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
import Link from "next/link";
import Bio from "../Bio";

import CasselShapiro from "../../public/bio/CasselShapiro.png";
import WebsterRoss from "../../public/bio/WebsterRoss.png";
import StevenMiller from "../../public/bio/StevenMiller.png";

import TonyBuckner from "../../public/bio/TonyBuckner.png";
import BrandonBaptiste from "../../public/bio/BrandonBaptiste.png";
import MaxSannikov from "../../public/bio/MaxSannikov.png";
import BlakeKeng from "../../public/bio/BlakeKeng.png";
import DimaZaiats from "../../public/bio/DimaZaiats.png";
import DemitriyLevy from "../../public/bio/DemitriyLevy.png";
import EricSchultz from "../../public/bio/EricSchultz.png";
import PeterShapiro from "../../public/bio/PeterShapiro.png";
import RosannaSpucces from "../../public/bio/RosannaSpucces.png";
import SushaUshakova from "../../public/bio/SushaUshakova.png";
import AlessandraBulow from "../../public/bio/AlessandraBulow.png";
import GigiGencturk from "../../public/bio/GigiGencturk.png";

import DavidIshag from "../../public/bio/DavidIshag.png";

import ElizabethHarrow from "../../public/bio/ElizabethHarrow.png";
import AddisonMcDowell from "../../public/bio/AddisonMcDowell.png";
import JordanMauro from "../../public/bio/JordanMauro.png";
import JCPagan from "../../public/bio/JCPagan.png";
import BillGlaser from "../../public/bio/BillGlaser.png";
import BrettModel from "../../public/bio/BrettModel.png";
import JasonGanfer from "../../public/bio/JasonGanfer.png";
import RyanMcHenry from "../../public/bio/RyanMcHenry.png";

const dt_crew = [
  {
    size: "small",
    img: TonyBuckner.src,
    name: "Tony Buckner",
    skill: "Brand and Influencer Partnerships",
    body: "Former First Data iOS Production Engineer, Giaia Wearables iOS Developer",
  },
  {
    size: "small",
    img: BrandonBaptiste.src,
    name: "Brandon Baptiste",
    skill: "Senior Front-End Developer",
    body: "15 years executing global corporate branding partnerships and experiential marketing projects",
  },
  {
    size: "small",
    img: MaxSannikov.src,
    name: "Max Sannikov",
    skill: "Senior Back-End Developer",
    body: "Full-Former Google Borg Software Engineer. Full Stack Engineer, passionate about technical challenges, product management and finance",
  },
  {
    size: "small",
    img: BlakeKeng.src,
    name: "Blake Keng",
    skill: "Director of UI/UX Design",
    body: "UX Designer with extensive experience in web and mobile product development, focused on creating intuitive and visually engaging interface solutions. Passionate about innovation and quality.",
  },
  {
    size: "small",
    isHover: true,
    img: DimaZaiats.src,
    name: "Dima Zaiats",
    skill: "Head UI/UX Design",
    body: "UX Designer with extensive experience in web and mobile product development, focused on creating intuitive and visually engaging interface solutions. Passionate about innovation and quality.",
  },
  {
    size: "small",
    isHover: true,
    img: DemitriyLevy.src,
    name: "Demitriy Levy",
    skill: "Back-End Developer",
    body: "Current Backend Engineer for Skillr. Creator of gRPC Framework for Node and an Entrepreneur for Lead-Generation in Car and Real-Estate Business",
  },
  {
    size: "small",
    isHover: true,
    img: EricSchultz.src,
    name: "Eric Schultz",
    skill: "Fractional CFO",
    body: "Managing Member, Reliant Fund Services, Owner, EAS Accounting Services",
  },
  {
    size: "small",
    isHover: true,
    img: PeterShapiro.src,
    name: "Peter Shapiro",
    skill: "Operations and Administration",
    body: "Former data analyst for Democratic Party ",
  },
  {
    size: "small",
    isHover: true,
    img: RosannaSpucces.src,
    name: "Rosanna Spucces",
    skill: "Senior UX/UI Designer",
    body: "UX and Graphic Designer with experience working with large scale brands such as: Star Wars, Live Nation, Space X, and Disney. ",
  },
  {
    size: "small",
    isHover: true,
    img: SushaUshakova.src,
    name: "Susha Ushakova",
    skill: "Fitness and Wellness Coordinator",
    body: "Bio text here",
  },
  {
    size: "small",
    isHover: true,
    img: AlessandraBulow.src,
    name: "Alessandra Bulow",
    skill: "Food and Beverage Expert",
    body: "Food Editor NBCUniversal Media",
  },
  {
    size: "small",
    isHover: true,
    img: GigiGencturk.src,
    name: "Gigi Gencturk",
    skill: "Office Manager",
    body: "Currently Office Manager and Executive Admin, SternAegis Ventures",
  },
];

const dt_advisors = [
  {
    size: "small",
    isHover: true,
    img: ElizabethHarrow.src,
    name: "Elizabeth Harrow",
    skill: "Advisor",
    body: "Vice President, Multicultural Innovation Lab at Morgan Stanley",
  },
  {
    size: "small",
    isHover: true,
    img: AddisonMcDowell.src,
    name: "Addison McDowell",
    skill: "Advisor",
    body: "Managing Director, Fields Texas Ltd.",
  },
  {
    size: "small",
    isHover: true,
    img: JordanMauro.src,
    name: "Jordan Mauro",
    skill: "Advisor",
    body: "Manager, Strategy & M&A Tata Consultancy. Former Manager KPMG M&A",
  },
  {
    size: "small",
    isHover: true,
    img: JCPagan.src,
    name: "JC Pagan",
    skill: "Advisor",
    body: "Founding Partner & Executive Creative Director at Sunday Afternoon. Former Deutsch, Creative Director",
  },
  {
    size: "small",
    isHover: true,
    img: BillGlaser.src,
    name: "Bill Glaser",
    skill: "Advisor",
    body: "CEO Outstanding Foods, Former CEO uKarma Corp. ",
  },
  {
    size: "small",
    isHover: true,
    img: BrettModel.src,
    name: "Brett Model",
    skill: "Advisor",
    body: "Brett is a hospitality and regional expert in Asia's most challenging work environments. Former Director Hospitality MGM Grand, Six Senses Hotels, Golden Nugget Lake Charles and quality.",
  },
  {
    size: "small",
    isHover: true,
    img: JasonGanfer.src,
    name: "Jason Ganfer",
    skill: "Advisor",
    body: "Counsel at Ganfer Shore Leeds & Zauderer, LLP",
  },
  {
    size: "small",
    isHover: true,
    img: RyanMcHenry.src,
    name: "Ryan McHenry",
    skill: "Advisor",
    body: "Controller, Sio Gene Therapies. Former Technical Accounting Senior Manager, CareFusion",
  },
];

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
              <Link href="#meet-crew">Meet the Crew</Link>
            </div>
            <div
              className={classNames(
                styles.tabLink,
                isActive == 2 && styles.active
              )}
              onClick={() => setActive(2)}
            >
              <Link href="#board-director">Board of Directors</Link>
            </div>
            <div
              className={classNames(
                styles.tabLink,
                isActive == 3 && styles.active
              )}
              onClick={() => setActive(3)}
            >
              <Link href="#board-advisor">Board of Advisors</Link>
            </div>
          </div>

          <div className={styles.bioWrapper} id="meet-crew">
            <Bio
              size="big"
              img={CasselShapiro.src}
              name="Cassel Shapiro"
              skill="Chief Executive and Board Leader"
              body="Senior Managing Director of SternAegis Ventures, Founder of Aegis Special Funds, Agritech Partners, Tech Insight Partners and Spring Targeted Opportunity Funds. Current Director DermaSensor, Inc.  and Outstanding Foods. Advisor to DarioHealth (NASDAQ: DRIO). Certified Developer in C#.Net, FINRA Principal, Investment Banking, Research Supervisor and Equities Market Making. I am devoted to executing our mission by assembling and leading a nimble organization. I love venture strategy and bringing big ideas to fruition.  "
            />
            <Bio
              size="big"
              img={WebsterRoss.src}
              name="Webster Ross III"
              skill="Chief Technology"
              body="Senior Managing Director of SternAegis Ventures, Founder of Aegis Special Funds, Agritech Partners, Tech Insight Partners and Spring Targeted Opportunity Funds. Current Director DermaSensor, Inc.  and Outstanding Foods. Advisor to DarioHealth (NASDAQ: DRIO). Certified Developer in C#.Net, FINRA Principal, Investment Banking, Research Supervisor and Equities Market Making. I am devoted to executing our mission by assembling and leading a nimble organization. I love venture strategy and bringing big ideas to fruition.  "
            />
            <Bio
              size="big"
              img={StevenMiller.src}
              name="Steven Miller"
              skill="Chief Marketing"
              body="Former AVP Marketing of Kenzie Academy, Head of Biz Dev at Shapr. With a focus on rational yet innovative ways to drive user acquisition and revenue growth, my ability to recognize and act on opportunities that lower cost and increase performance drive the success I deliver for organizations. Growing teams that are nimble and determined is my specialty"
            />
          </div>

          <div className={classNames(styles.bioWrapper, styles.ctMargin)}>
            <div className={styles.flexContainer}>
              {dt_crew.map((crew, index) => (
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

          <h3 className={styles.textCenter} id="board-director">
            Board of Directors
          </h3>
          <div className={styles.bioWrapper}>
            <Bio
              size="big"
              img={DavidIshag.src}
              name="David Ishag"
              skill="Board Member "
              body="Mr. Ishag is a current director of Zoomcar Holdings. He has leadership roles within Karhoo, Virgin Hyperloop One, Idealab, Capella Films"
            />
            <Bio
              size="big"
              img={CasselShapiro.src}
              name="Cassel Shapiro"
              skill="Chief Executive and Board Leader"
              body="Senior Managing Director of SternAegis Ventures, Founder of Aegis Special Funds, Agritech Partners, Tech Insight Partners and Spring Targeted Opportunity Funds. Current Director DermaSensor, Inc.  and Outstanding Foods. Advisor to DarioHealth (NASDAQ: DRIO). Certified Developer in C#.Net, FINRA Principal, Investment Banking, Research Supervisor and Equities Market Making. I am devoted to executing our mission by assembling and leading a nimble organization. I love venture strategy and bringing big ideas to fruition.  "
            />
          </div>

          <h3
            className={classNames(styles.textCenter, styles.ctMargin)}
            id="board-advisor"
          >
            Board of Advisors
          </h3>
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
