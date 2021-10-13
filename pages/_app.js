import "../styles/globals.css";
import { polyfill } from "smoothscroll-polyfill";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  // polyfill();
  const router = useRouter();
  if (typeof window !== "undefined") polyfill();

  return (
    <div>
      <Navbar page={router.pathname.slice(1)} />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
