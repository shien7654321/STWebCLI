import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import prettierPluginRecommend from 'eslint-plugin-prettier/recommended';
import { version } from 'node:os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: jsPlugin.configs.recommended,
    allConfig: jsPlugin.configs.all,
});

export default defineConfig([
    globalIgnores(['node_modules/*', 'dist/*', 'dll/*', 'build/*']),
    {
        files: ['src/**/*.{js,ts,jsx,tsx}'],
        extends: [
            ...fixupConfigRules(
                compat.extends('eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'),
            ),
            prettierPluginRecommend,
        ],
        plugins: {
            react: fixupPluginRules(reactPlugin),
            '@typescript-eslint': tsPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            indent: [
                'error',
                4,
                {
                    SwitchCase: 1,
                },
            ],
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
            'react/jsx-filename-extension': [
                2,
                {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            ],
            'react/prefer-stateless-function': 'off',
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/react-in-jsx-scope': 'off',
            'react/jsx-no-bind': 'off',
            '@typescript-eslint/no-unused-vars': [
                2,
                {
                    args: 'none',
                },
            ],
            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]);
