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
        indent: ['error', 4, { SwitchCase: 1 }],
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
        'import/no-unresolved': 'off',
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['state'],
            },
        ],
        'max-len': [
            'error',
            {
                code: 120,
            },
        ],
    },
};
