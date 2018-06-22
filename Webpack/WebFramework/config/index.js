
const dev = require('./config.dev')
const local = require('./config.local')
const production = require('./config.production')

var config = {};
if (process.env.NODE_ENV === 'dev') {
    config = dev;
} else if (process.env.NODE_ENV === 'local') {
    config = local;
} else if (process.env.NODE_ENV === 'production') {
    config = production;
} else {
    config = local;
}

module.exports = config;