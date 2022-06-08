module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:vue/essential', 'airbnb-base'],
    plugins: ['vue'],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    settings: {
        'import/extensions': ['.js', '.mjs'],
    },
    rules: {
        indent: ['error', 4],
        'vue/multi-word-component-names': 'off',
        'vue/no-v-model-argument': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                mjs: 'never',
            },
        ],
    },
};
