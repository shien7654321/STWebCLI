const log = require('../common/log');
const inquirer = require('inquirer');
const fs = require('fs');
const ora = require('ora');
const shelljs = require('shelljs');
const download = require('../common/download');
const templates = require('../common/config.json').templates;

async function init(projectName, options = {}, context = process.cwd()) {
    let templateName = options.template;
    if (!templateName) {
        templateName = await askTemplate();
    }
    const templateInfo = templates.find(item => item.name === templateName);
    if (!templateInfo) {
        return log('no such template', 'ERROR');
    }
    const packageInfo = { name: projectName, version: '1.0.0' };
    const downloadSpinner = ora({
        text: 'start download template...',
        color: 'blue',
    }).start();
    const { dir, name, flag } = await download(templateInfo.url, projectName, context);
    if (flag) {
        downloadSpinner.succeed('download template success');
        const configSpinner = ora({
            text: 'start config project...',
            color: 'blue',
        }).start();
        const configFlag = await configPackageInfo(dir, packageInfo);
        if (configFlag) {
            if (shelljs.which('yarn')) {
                configSpinner.succeed('config project success');
                const installSpinner = ora({
                    text: 'start install project...',
                    color: 'blue',
                }).start();
                log('\n');
                shelljs.exec(`cd ${projectName} && yarn && cd ..`);
                log('\n');
                installSpinner.succeed('create project success');
            } else {
                configSpinner.succeed('create project success');
            }
        } else {
            configSpinner.fail('create project fail');
        }
    } else {
        downloadSpinner.fail('download template fail');
    }
}

async function askTemplate() {
    return new Promise(resolve => {
        let templateName = '';
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'please select your UI framework',
                    name: 'ui',
                    choices: ['vue3', 'vue2'],
                },
            ])
            .then(res => {
                if (res.ui === 'vue3') {
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                message: 'please select your packaging tool',
                                name: 'pack',
                                choices: ['webpack', 'vite'],
                            },
                        ])
                        .then(res => {
                            if (res.pack === 'webpack') {
                                templateName = 'vue3-webpack';
                            } else if (res.pack === 'vite') {
                                templateName = 'vue3-vite';
                            }
                            resolve(templateName);
                        });
                } else if (res.ui === 'vue2') {
                    templateName = 'vue2-webpack';
                    resolve(templateName);
                }
            });
    });
}

async function configPackageInfo(dir, packageInfo) {
    return new Promise(resolve => {
        const filePath = dir + '/package.json';
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return resolve(false);
            }
            const newPackageInfo = { ...JSON.parse(data), ...packageInfo };
            fs.writeFile(filePath, JSON.stringify(newPackageInfo, null, 4), 'utf8', err => resolve(!Boolean(err)));
        });
    });
}

module.exports = init;
