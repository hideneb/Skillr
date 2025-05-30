// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
    // reactStrictMode: true,
    images: {
        domains: [
            'skillr-optimizer.mo.cloudinary.net',
            'skillr-uploads-development.s3.amazonaws.com',
            'skillr-uploads-staging.s3.amazonaws.com',
            'skillr-uploads-production.s3.amazonaws.com',
            'res.cloudinary.com',
        ],
    },
    env: {
        API_HOST: process.env.API_HOST,
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/;
        }
        config.module.rules.push({
            test: /\.svg$/,
            loader: require.resolve('@svgr/webpack'),
        });
        return config;
    },
};

// const SentryWebpackPluginOptions = {
//   // Additional config options for the Sentry Webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, org, project, authToken, configFile, stripPrefix,
//   //   urlPrefix, include, ignore

//   silent: true, // Suppresses all logs
//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// };

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
module.exports = moduleExports; // for local build and export
