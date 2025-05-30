import Document, { Html, Head, Main, NextScript } from 'next/document';
import * as snippet from '@segment/snippet';

const { ANALYTICS_WRITE_KEY, NODE_ENV = 'development' } = process.env;

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    renderSnippet() {
        const opts = {
            apiKey: ANALYTICS_WRITE_KEY,
            // note: the page option only covers SSR tracking.
            // Page.js is used to track other events using `window.analytics.page()`
            page: true,
        };

        if (NODE_ENV === 'development') {
            return snippet.max(opts);
        }

        return snippet.min(opts);
    }

    render() {
        return (
            <Html>
                <Head>
                    {/* Inject the Segment snippet into the <head> of the document  */}
                    <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
