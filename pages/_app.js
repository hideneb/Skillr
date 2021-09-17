import '../styles/globals.css'
import { polyfill } from "smoothscroll-polyfill";

function MyApp({ Component, pageProps }) {
  // polyfill();
  if (typeof window !== "undefined")
    polyfill()

  return <Component {...pageProps} />
}

export default MyApp
