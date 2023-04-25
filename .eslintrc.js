module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:san/essential', 'airbnb-base'],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'import/extensions': 'off',
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
        'class-methods-use-this': 'off',
    },
};
