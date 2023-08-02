module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb'],
    plugins: ['react', '@typescript-eslint'],
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
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/prefer-stateless-function': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-bind': 'off',
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
        'no-shadow': 'off',
    },
};
