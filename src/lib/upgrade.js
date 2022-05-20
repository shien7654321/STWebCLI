const updateNotifier = require('update-notifier');
const chalk = require('chalk');
const log = require('../common/log');
const pkg = require('../../package.json');

const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000,
});

module.exports = function () {
    if (notifier.update) {
        log(`new version available: ${chalk.cyan(notifier.update.latest)}`);
        notifier.notify();
    } else {
        log('no new version is available');
    }
};
