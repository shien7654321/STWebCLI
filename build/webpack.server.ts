import webpack from 'webpack';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import baseConfig from './webpack.base';

export default merge(baseConfig, {
    target: 'node',
    mode: 'production',
    entry: {
        main: './src/entry-server.ts',
    },
    output: {
        filename: 'static/js/[name].[chunkhash:8].server.js',
        libraryTarget: 'commonjs2',
    },
    optimization: {
        splitChunks: false,
        minimize: false,
    },
    externals: [
        nodeExternals({
            allowlist: [/\.(css|less|sass|scss)$/, /\.(vue)$/, /\.(html)$/],
        }),
    ],
    devtool: 'nosources-source-map',
    node: {
        __dirname: false,
        __filename: false,
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
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
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
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                    'css-unicode-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('production'),
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            ignoreOrder: true,
        }),
        new WebpackManifestPlugin({
            fileName: 'ssr-manifest.json',
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
});
