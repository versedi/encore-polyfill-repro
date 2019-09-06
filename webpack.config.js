const Encore = require('@symfony/webpack-encore');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
//
Encore.addPlugin(
    new SentryWebpackPlugin({
        include: './public/assets/',
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



Encore.splitEntryChunks()
    .addEntry('app', './js/app.js')
    .enableVersioning(Encore.isProduction())
    .enableIntegrityHashes(Encore.isProduction())
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


if (Encore.isProduction()) {
    config.devtool = 'source-map';
}

module.exports = config;
