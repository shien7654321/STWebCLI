import { merge } from 'webpack-merge';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import baseConfig, { resolve } from './webpack.base';

export default merge(baseConfig, {
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
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
        }),
        new VueLoaderPlugin(),
    ],
});
