const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    target: 'node',
    node: false,
    mode: 'production',
    context: resolve('/'),
    entry: './src/bin/index.js',
    output: {
        path: resolve('dist'),
        clean: true,
    },
    resolve: {
        extensions: ['.jsx', '.js', '.mjs', '.json'],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify,
                terserOptions: {
                    compress: {
                        drop_console: false,
                    },
                },
                extractComments: false,
            }),
        ],
        moduleIds: 'deterministic',
    },
    devtool: 'nosources-source-map',
    stats: {
        errorDetails: true,
    },
    performance: {
        maxEntrypointSize: Infinity,
        maxAssetSize: 1.5 * 1024 * 1024,
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                exclude: file => file.includes('node_modules'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.mjs$/,
                resolve: {
                    fullySpecified: false,
                },
                include: /node_modules/,
                type: 'javascript/auto',
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: resolve('node_modules/shelljs/src/exec-child.js'),
                    to: '',
                },
            ],
        }),
        new webpack.ContextReplacementPlugin(/keyv|update-notifier/, data => {
            delete data.dependencies[0].critical;
            return data;
        }),
        new webpack.BannerPlugin({
            banner: '#!/usr/bin/env node',
            raw: true,
        }),
    ],
};
