const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    context: resolve('/'),
    target: 'web',
    entry: './src/main.js',
    output: {
        path: resolve('dist'),
        clean: true,
        filename: 'js/[name].[chunkhash:8].client.js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            process: 'process/browser',
        },
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
    stats: {
        children: true,
        errorDetails: true,
    },
    performance: {
        maxEntrypointSize: Infinity,
        maxAssetSize: 1.5 * 1024 * 1024,
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            transformAssetUrls: {
                                video: ['src', 'poster'],
                                source: 'src',
                                img: 'src',
                                image: 'xlink:href',
                            },
                        },
                    },
                ],
            },
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
                    filename: 'img/[name].[hash:8][ext]',
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
                    filename: 'font/[name].[hash:8][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024,
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            'process.env': JSON.stringify(process.env),
        }),
        new VueLoaderPlugin(),
        new HtmlPlugin({
            template: './index.html',
            filename: 'index.html',
            title: 'STWebCLITemplate',
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};
