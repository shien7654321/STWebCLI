/**
 * webpack base config, support app and node
 */
import path from 'path';
import webpack from 'webpack';

export function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const config: webpack.Configuration | webpack.WebpackOptionsNormalized = {
    context: resolve('/'),
    output: {
        clean: true,
        publicPath: '',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
        },
    },
    stats: {
        children: true,
        errorDetails: true,
    },
    module: {
        rules: [
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
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
};

export default config;
