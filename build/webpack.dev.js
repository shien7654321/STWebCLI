const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'development',
    optimization: {
        moduleIds: 'named',
        chunkIds: 'named',
        mangleExports: 'deterministic',
        runtimeChunk: 'single',
    },
    devtool: 'cheap-module-source-map',
    cache: {
        type: 'filesystem',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    'css-unicode-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_PROD_DEVTOOLS__: true,
            ENV: JSON.stringify('development'),
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            ignoreOrder: true,
        }),
    ],
    devServer: {
        open: true,
        historyApiFallback: true,
    },
});
