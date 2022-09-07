/**
 * webpack server config
 */
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import appConfig from './webpack.app';
import { resolve } from './webpack.base';

export default merge(appConfig, {
    target: 'node',
    mode: 'production',
    entry: './src/entry/entry-server.ts',
    output: {
        path: resolve('dist/server'),
        filename: 'static/js/[name].[chunkhash:8].server.js',
        libraryTarget: 'commonjs2',
    },
    optimization: {
        splitChunks: false,
        minimize: false,
    },
    externals: [
        nodeExternals({
            allowlist: [/\.(css|less|s[ac]ss)$/, /\.(vue)$/, /\.(html)$/, /^webpack\/container\/reference\//],
        }),
    ],
    externalsPresets: {
        node: true,
    },
    devtool: 'nosources-source-map',
    node: {
        __dirname: false,
        __filename: false,
    },
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.(m?jsx?|babel|es6)$/,
                exclude: file => file.includes('node_modules') && !file.includes('.vue.js'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // cacheDirectory: true,
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        modules: 'commonjs',
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(css|less|s[ac]ss)$/,
                use: 'null-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                use: 'null-loader',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: 'null-loader',
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: 'null-loader',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_PROD_DEVTOOLS__: true,
            ENV: JSON.stringify('production'),
            'process.env.IS_NODE': true,
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            ignoreOrder: true,
        }),
        new WebpackManifestPlugin({
            fileName: 'server-manifest.json',
            publicPath: '',
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
    ],
});
