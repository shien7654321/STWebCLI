module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:vue/essential', 'airbnb-base'],
    plugins: ['vue', '@typescript-eslint'],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        indent: ['error', 4],
        'vue/multi-word-component-names': 'off',
        'vue/no-v-model-argument': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'vue/no-multiple-template-root': 'off',
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'state',
                ],
            },
        ],
    },
};
