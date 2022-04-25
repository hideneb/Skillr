import "../styles/globals.css";
import { polyfill } from "smoothscroll-polyfill";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (typeof window !== "undefined") polyfill();

  return (
    <div>
      <Script
        id="ze-snippet"
        strategy="afterInteractive"
        src="https://static.zdassets.com/ekr/snippet.js?key=f367139b-5b83-46c5-91ad-95306b7da40b"
      ></Script>
      <Navbar page={router.pathname.slice(1)} />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
