import https from 'https';
import fs from 'fs';
import ora from 'ora';
import log from '../common/log.js';

const CONFIG_URL = 'https://raw.githubusercontent.com/shien7654321/STWebCLI/main/src/common/config.json';

export default function () {
    const spinner = ora({
        text: 'Start update config...',
        color: 'blue',
    }).start();
    return new Promise(resolve => {
        const filePath = (new URL('../common/config.json', import.meta.url)).pathname;
        let file = null;

        function errCallback(err) {
            file && fs.unlink(filePath, () => {
            });
            spinner.fail('update fail');
            err && log('error', err);
        }

        https
            .get(CONFIG_URL, response => {
                if (response.statusCode === 200) {
                    file = fs.createWriteStream(filePath);
                    response.pipe(file);
                    file.on('finish', () => file.close(() => spinner.succeed('Update success!')));
                    resolve(true);
                } else {
                    errCallback();
                    resolve(false);
                }
            })
            .on('error', err => {
                errCallback(err);
                resolve(false);
            });
    });
};
