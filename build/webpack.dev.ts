/**
 * webpack dev config
 */
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import clientConfig from './webpack.client';

export default merge(clientConfig, {
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
                use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.s[ac]ss$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.styl(us)?$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
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
