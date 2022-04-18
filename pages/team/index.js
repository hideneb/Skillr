import React from "react";
import Teams from "../../components/Team";
import Head from "next/head";

export default function TeamPage() {
	return (
		<div className="teams">
			<Head>
				<title>About Us | Skillr</title>
				<meta name="description" content="Skillr" />
				<link rel="preload" href="/fonts/Poppins/Poppins-Regular.ttf" as="font" crossOrigin="" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Teams />
		</div>
	);
}
