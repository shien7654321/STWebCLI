const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        moduleIds: 'deterministic',
    },
    devtool: 'nosources-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.styl(us)?$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'stylus-loader'],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production'),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            ignoreOrder: true,
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/,
            threshold: 10240,
        }),
    ],
});
