const Encore = require('@symfony/webpack-encore');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');


Encore.addPlugin(
    new SentryWebpackPlugin({
        include: './build/',
        ignoreFile: '.sentrycliignore',
        ignore: [
            'node_modules',
            'webpack.config.js',
            'allure-report',
            'gulpfile.js',
        ],
        configFile: 'sentry.properties',
        validate: true,
    }),
);

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}
Encore.setOutputPath('build/') // directory where compiled assets will be stored
    .setPublicPath('/'); // public path used by the web server to access the output path


Encore.cleanupOutputBeforeBuild();

Encore.configureBabel(
    babelConfig => {
        // add additional presets (preset-env is added by default)
        babelConfig.presets.push('@babel/preset-flow');
        // IE11/Edge requires below plugins
        babelConfig.plugins.push('@babel/plugin-transform-object-assign');
        babelConfig.plugins.push('@babel/plugin-transform-spread');
        babelConfig.plugins.push('@babel/plugin-transform-exponentiation-operator');
        babelConfig.plugins.push('@babel/plugin-transform-arrow-functions');
        // no plugins are added by default, but you can add some
        // babelConfig.plugins.push('styled-jsx/babel');
        // if (Encore.isProduction()) {
        //     babelConfig.plugins.push("transform-remove-console");
        // }
    },
    {
        // node_modules is not processed through Babel by default
        // but you can whitelist specific modules to process
        includeNodeModules: [
            '@sentry/browser',
            '@sentry/browser/esm',
        ],
        useBuiltIns: 'usage',
        corejs: {
            version: 3.2,
            proposals: true,
        },
    },
)

Encore.splitEntryChunks()
    .addEntry('app', './js/app.ts')
    .enableSingleRuntimeChunk()
    .configureSplitChunks(() => ({
        name: 'vendor_app',
        chunks: 'all',
        minChunks: 2,
    }))
    .autoProvidejQuery() // uncomment if you're having problems with a jQuery plugin
    .enableTypeScriptLoader();

Encore.enableSourceMaps(true);
const config = Encore.getWebpackConfig();


config.devtool = 'source-map';

module.exports = config;
