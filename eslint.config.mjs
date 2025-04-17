import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import jsPlugin from '@eslint/js';
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
        files: ['src/**/*.js'],
        extends: [...compat.extends('eslint:recommended'), prettierPluginRecommend],
        languageOptions: {
            globals: {
                ...globals.node,
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
            'no-shadow': 'off',
        },
    },
]);
