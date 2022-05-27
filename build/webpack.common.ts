import path from 'path';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const config: webpack.Configuration | webpack.WebpackOptionsNormalized = {
    context: resolve('/'),
    target: 'web',
    entry: {
        main: './src/main.ts',
        vendor: ['vue'],
    },
    output: {
        path: resolve('dist'),
        clean: true,
        filename: 'static/js/[name].[chunkhash:8].min.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.vue', '.json'],
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
                exclude: (file) => file.includes('node_modules') && !file.includes('.vue.js'),
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
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            appendTsxSuffixTo: ['\\.vue$'],
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
        new CompressionPlugin({
            test: /\.(js|css)$/,
            threshold: 10240,
        }),
        new HtmlPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['main', 'vendor'],
            title: 'STWebCLITemplate',
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};

export default config;
