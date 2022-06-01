module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:vue/essential', 'airbnb-base'],
    plugins: ['vue'],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        indent: ['error', 4],
        'vue/multi-word-component-names': 'off',
        'vue/no-v-model-argument': 'off',
    },
};
