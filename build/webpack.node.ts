/**
 * webpack node config
 */
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import baseConfig, { resolve } from './webpack.base';

export default merge(baseConfig, {
    target: 'node',
    mode: 'production',
    entry: './server/index.ts',
    output: {
        path: resolve('dist/node'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    optimization: {
        splitChunks: false,
        minimize: false,
    },
    externals: [nodeExternals()],
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
        parser: {
            javascript: {
                commonjs: true,
                commonjsMagicComments: true,
            },
        },
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
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.IS_NODE': true,
        }),
    ],
});
