const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'development',
    optimization: {
        moduleIds: 'named',
        chunkIds: 'named',
    },
    devtool: 'eval-cheap-module-source-map',
    cache: {
        type: 'filesystem',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.styl(us)?$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_PROD_DEVTOOLS__: true,
            ENV: JSON.stringify('development'),
        }),
    ],
    devServer: {
        open: true,
        historyApiFallback: true,
    },
});
