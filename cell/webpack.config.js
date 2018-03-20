const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: `${__dirname}/public/dist`,
        filename: 'bundle.js'
    },
    devtool: 'source-map'
};
