module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['eslint:recommended', 'airbnb-base'],
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
        '@typescript-eslint/ban-ts-comment': 'off',
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "warn",
    },
};
