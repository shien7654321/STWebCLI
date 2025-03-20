import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import prettierPluginRecommend from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: jsPlugin.configs.recommended,
    allConfig: jsPlugin.configs.all,
});

const rules = {
    indent: [
        'error',
        4,
        {
            SwitchCase: 1,
        },
    ],
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
    '@typescript-eslint/no-unused-vars': [
        2,
        {
            args: 'none',
        },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
};

export default defineConfig([
    globalIgnores(['node_modules/*', 'dist/*', 'dll/*', 'build/*', 'src/types/*']),
    {
        files: ['src/**/*.{vue}'],
        extends: [...compat.extends('eslint:recommended', 'plugin:vue/essential'), prettierPluginRecommend],
        plugins: {
            vue: vuePlugin,
            '@typescript-eslint': tsPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                }
            }
        },
        rules,
    },
    {
        files: ['src/**/*.{js,ts,jsx,tsx}'],
        extends: [...compat.extends('eslint:recommended'), prettierPluginRecommend],
        plugins: {
            vue: vuePlugin,
            '@typescript-eslint': tsPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                }
            }
        },
        rules,
    }
]);
