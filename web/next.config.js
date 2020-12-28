const withCSS = require('@zeit/next-css');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = withCSS({
    webpack(config, options) {
        config.plugins.push(new MonacoWebpackPlugin());

        config.plugins.push(
            new MonacoWebpackPlugin({
                languages: ["html", "json", "javascript"],
                filename: "static/[name].worker.js",
            })
        );

        return config;
    },
    cssLoaderOptions: { url: false }
})
