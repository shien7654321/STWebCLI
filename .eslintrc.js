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
    },
};
