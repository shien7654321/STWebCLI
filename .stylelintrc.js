module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-stylus/standard'],
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
