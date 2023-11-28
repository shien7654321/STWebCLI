module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:vue/essential', 'airbnb-base'],
    plugins: ['vue', '@typescript-eslint'],
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'vue/multi-word-component-names': 'off',
        'vue/no-v-model-argument': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'vue/no-multiple-template-root': 'off',
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
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'warn',
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    },
};
