import { merge } from 'webpack-merge';
import baseConfig from './webpack.base';
import HtmlPlugin from 'html-webpack-plugin';

export default merge(baseConfig, {
    target: 'web',
    entry: {
        main: './src/entry-client.ts',
        vendor: ['vue', 'vue-router', 'vuex'],
    },
    output: {
        filename: 'static/js/[name].[chunkhash:8].client.js',
    },
    plugins: [
        new HtmlPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['main', 'vendor'],
            title: 'STWebCLITemplate',
        }),
    ],
});
