import updateNotifier from 'update-notifier';
import chalk from 'chalk';
import log from '../common/log.js';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync((new URL('../../package.json', import.meta.url)).pathname, 'utf8'));

const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000,
});

export default function () {
    if (notifier.update) {
        log('info', `new version available: ${chalk.cyan(notifier.update.latest)}`);
        notifier.notify();
    } else {
        log('info', 'no new version is available');
    }
};
