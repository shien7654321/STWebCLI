const downloadGitRepo = require('download-git-repo');
const path = require('path');
const rimraf = require('rimraf');
const log = require('./log');

module.exports = async function (url, name, target = process.cwd()) {
    return new Promise(resolve => {
        const dir = path.join(target, name);
        rimraf.sync(dir, {});

        function downLoadCallback(err) {
            if (err) {
                resolve({ flag: false, dir, name });
                log('error', err);
            }
            resolve({ flag: true, dir, name });
        }

        downloadGitRepo(url, dir, { clone: true }, downLoadCallback);
    });
};
