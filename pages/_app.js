import "../styles/globals.css";
import { polyfill } from "smoothscroll-polyfill";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  // polyfill();
  if (typeof window !== "undefined") polyfill();

  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
