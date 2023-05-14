import downloadGitRepo from 'download-git-repo';
import path from 'path';
import rimraf from 'rimraf';
import log from './log.js';

export default async function (url, name, target = process.cwd()) {
    return new Promise(resolve => {
        const dir = path.join(target, name);
        rimraf.sync(dir, {});

        function downLoadCallback(err) {
            if (err) {
                resolve({flag: false, dir, name});
                log('error', err);
            }
            resolve({flag: true, dir, name});
        }

        downloadGitRepo(url, dir, {clone: true}, downLoadCallback);
    });
};
