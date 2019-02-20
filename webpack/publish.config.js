const BaseConfig = require('./base.config');

module.exports = {
    ...BaseConfig,
    // Override 'mode' to enable webpack optimisations for pre-publishing
    mode: 'production'
};
