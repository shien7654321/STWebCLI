module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-stylus/standard', 'stylelint-config-recommended-vue'],
    overrides: [
        {
            files: '**/*.less',
            customSyntax: 'postcss-less',
        },
    ],
    rules: {
        indentation: 4,
        'selector-class-pattern': null,
    },
};
