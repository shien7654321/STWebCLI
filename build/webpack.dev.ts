import webpack from 'webpack';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.base';

export default merge(baseConfig, {
    mode: 'development',
    optimization: {
        moduleIds: 'named',
        chunkIds: 'named',
    },
    devtool: 'eval-cheap-module-source-map',
    cache: {
        type: 'filesystem',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
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
                    'vue-style-loader',
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
                    'vue-style-loader',
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
                    'vue-style-loader',
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
            __VUE_PROD_DEVTOOLS__: true,
            ENV: JSON.stringify('development'),
        }),
    ],
    devServer: {
        open: true,
        historyApiFallback: true,
    },
});
