import React from "react";
import About from "../../components/About";
import Head from "next/head";

export default function AboutPage() {
	return (
		<div>
			<Head>
				<title>About Us | Skillr</title>
				<meta name="description" content="Skillr" />
				<link rel="preload" href="/fonts/Poppins/Poppins-Regular.ttf" as="font" crossOrigin="" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<About />
		</div>
	);
}
