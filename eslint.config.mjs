import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsPlugin from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPluginRecommend from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: jsPlugin.configs.recommended,
    allConfig: jsPlugin.configs.all,
});

export default defineConfig([
    globalIgnores(['node_modules/*', 'dist/*', 'dll/*']),
    {
        files: ['src/**/*.{js,ts}'],
        extends: [
            ...compat.extends('eslint:recommended'),
            prettierPluginRecommend,
        ],
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.node,
            },
            parser: tsParser,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
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
            '@typescript-eslint/ban-ts-comment': 'off',
            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': 'warn',
            '@typescript-eslint/no-unused-vars': [
                2,
                {
                    args: 'none',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'off'
        },
    },
]);
