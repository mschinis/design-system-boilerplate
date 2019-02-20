const BaseConfig = require('./base.config');

module.exports = {
    ...BaseConfig,

    // Write to disk to ensure hot module reload works with the bundlers
    // that implement the design system. ex: ember-cli, webpack.
    devServer: {
        writeToDisk: true
    }
};
