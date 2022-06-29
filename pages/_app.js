import '../styles/globals.css';
import { polyfill } from 'smoothscroll-polyfill';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    if (typeof window !== 'undefined') polyfill();

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    return (
        <SWRConfig value={{ fetcher }}>
            <div>
                {/* <Script
					id="ze-snippet"
					strategy="afterInteractive"
					src="https://static.zdassets.com/ekr/snippet.js?key=f367139b-5b83-46c5-91ad-95306b7da40b"
				></Script> */}
                <Script src="https://static.opentok.com/v2/js/opentok.min.js"></Script>
                <Navbar page={router.pathname.slice(1)} />
                <Component {...pageProps} />
            </div>
        </SWRConfig>
    );
}

export default MyApp;
