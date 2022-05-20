const https = require('https');
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const log = require('../common/log');

const CONFIG_URL = 'https://raw.githubusercontent.com/shien7654321/STWebCLI/main/src/common/config.json';

module.exports = function () {
    const spinner = ora({
        text: 'Start update config...',
        color: 'blue',
    }).start();
    return new Promise(resolve => {
        const filePath = path.join(__dirname, '../common/config.json');
        let file = null;

        function errCallback(err) {
            file && fs.unlink(filePath, () => {});
            spinner.fail('update fail');
            err && log(err, 'ERROR');
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
