#!/usr/bin/env node
import {program} from 'commander';
import fs from 'fs';
import init from '../lib/init.js';
import list from '../lib/list.js';
import update from '../lib/update.js';
import upgrade from '../lib/upgrade.js';

const {version} = JSON.parse(fs.readFileSync((new URL('../../package.json', import.meta.url)).pathname, 'utf8'));

program.version(version, '-v, --version');

program
    .command('init <project-name>')
    .description('initialize a project')
    .option('-t, --template <template>', 'template name')
    .action((name, options) => init(name, options));

program
    .command('list')
    .description('list all templates')
    .option('-q, --query <query>', 'template name to query')
    .action(options => list(options));

program
    .command('update')
    .description('update template config')
    .action(() => update());

program
    .command('upgrade')
    .description('check if there is a new version')
    .action(() => upgrade());

program.on('command:*', function () {
    console.log('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
    process.exit(1);
});

program.parse(process.argv);
