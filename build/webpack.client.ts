/**
 * webpack client config, support dev and prod
 */
import { merge } from 'webpack-merge';
import webpack from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import appConfig from './webpack.app';
import { resolve } from './webpack.base';
import HtmlPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

export default merge(appConfig, {
    target: 'web',
    entry: './src/entry/entry-client.ts',
    output: {
        path: resolve('dist/client'),
        filename: 'static/js/[name].[chunkhash:8].client.js',
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
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
    },
    performance: {
        maxEntrypointSize: Infinity,
        maxAssetSize: 1.5 * 1024 * 1024,
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                exclude: file => file.includes('node_modules') && !file.includes('.vue.js'),
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
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'static/img/[name].[hash:8][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    },
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'static/font/[name].[hash:8][ext]',
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'static/media/[name].[hash:8][ext]',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.IS_NODE': false,
        }),
        new HtmlPlugin({
            template: './public/index.html',
            filename: 'index.html',
            title: 'STWebCLITemplate',
            favicon: 'src/assets/image/favicon.ico',
            minify: {
                removeComments: false,
            },
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new WebpackManifestPlugin({
            fileName: 'client-manifest.json',
            publicPath: '',
        }),
        new CompressionPlugin({
            test: /\.(js|css)$/,
            threshold: 10240,
        }),
    ],
});
