// todo: remove nocheck
// @ts-nocheck
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { polyfill } from 'smoothscroll-polyfill';
import Navbar from '@/components/UI/Navbar';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
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
                <Navbar route={router.route} useMobileMenu={pageProps.useMobileMenu} />
                <Component {...pageProps} />
            </div>
        </SWRConfig>
    );
}

export default MyApp;
