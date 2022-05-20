module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['defaults'],
                },
            },
        ],
    ],
    plugins: ['@vue/babel-plugin-jsx'],
};
