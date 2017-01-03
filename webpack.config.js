module.exports = process.env.NODE_ENV === 'production' ? require('./webpack.config.production.js') : require('./webpack.config.base.js');
// module.exports = require('./webpack.config.base.js');
