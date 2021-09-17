import React from "react";
import AboutUs from "../../components/AboutUs";
import Head from "next/head";

export default function AboutUsPage() {
  return (
    <div>
      <Head>
        <title>About Us | Skillr</title>
        <meta name="description" content="Skillr" />
        <link
          rel="preload"
          href="/fonts/RedHatDisplay/RedHatDisplay-Regular.ttf"
          as="font"
          crossOrigin=""
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AboutUs />
    </div>
  );
}
