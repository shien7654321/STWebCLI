module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recess-order',
    ],
    overrides: [
        {
            files: '**/*.less',
            customSyntax: 'postcss-less',
        },
        {
            files: '**/*.sass',
            customSyntax: 'postcss-sass',
        },
        {
            files: '**/*.scss',
            customSyntax: 'postcss-scss',
        },
        {
            files: ['**/*.styl', '**/*.stylus'],
            customSyntax: 'postcss-styl',
        },
    ],
    rules: {
        indentation: 4,
        'selector-class-pattern': null,
    },
};
