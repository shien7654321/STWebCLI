/**
 * webpack prod config
 */
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import clientConfig from './webpack.client';
import { resolve } from './webpack.base';

export default merge(clientConfig, {
    mode: 'production',
    optimization: {
        moduleIds: 'deterministic',
    },
    devtool: 'nosources-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    'postcss-loader',
                    'stylus-loader',
                ],
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
        new CopyPlugin({
            patterns: [
                {
                    from: resolve('public'),
                    to: '.',
                    filter: (item) => !/index.html$/.test(item),
                },
            ],
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/,
            threshold: 10240,
        }),
    ],
});
