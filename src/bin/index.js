#!/usr/bin/env node
const program = require('commander');

program.version(require('../../package').version, '-v, --version');

program
    .command('init <project-name>')
    .description('initialize a project')
    .option('-t, --template <template>', 'template name')
    .action((name, options) => require('../lib/init')(name, options));

program
    .command('list')
    .description('list all templates')
    .option('-q, --query <query>', 'template name to query')
    .action(options => require('../lib/list')(options));

program
    .command('update')
    .description('update template config')
    .action(() => require('../lib/update')());

program
    .command('upgrade')
    .description('check if there is a new version')
    .action(() => require('../lib/upgrade')());

program.on('command:*', function () {
    console.log('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program.parse(process.argv);
