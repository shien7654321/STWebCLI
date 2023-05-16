import log from '../common/log.js';
import inquirer from 'inquirer';
import fs from 'fs';
import ora from 'ora';
import shelljs from 'shelljs';
import crypto from 'crypto';
import download from '../common/download.js';

const {template: tpl} = JSON.parse(fs.readFileSync((new URL('../common/config.json', import.meta.url)).pathname, 'utf8'));

async function init(projectName, options = {}, context = process.cwd()) {
    let templateName = options.template;
    if (!templateName) {
        templateName = await ask(tpl);
    }
    const templateUrl = getTemplateInfo()[templateName];
    if (!templateUrl) {
        return log('error', 'no such template');
    }
    const packageInfo = {name: projectName, version: '1.0.0'};
    if (templateName === 'node') {
        packageInfo.bin = {
            [projectName]: 'dist/bin/index.js',
        };
    }
    const downloadSpinner = ora({
        text: 'start download template...',
        color: 'blue',
    }).start();
    const {dir, flag} = await download(templateUrl, projectName, context);
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
                log('info', '\n');
                shelljs.exec(`cd ${projectName} && yarn && cd ..`);
                log('info', '\n');
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

function ask(template) {
    return new Promise(resolve1 => {
        const promptParam = {
            name: crypto.randomBytes(16).toString('hex'),
        };
        if (template.type) {
            promptParam.type = template.type;
        }
        if (template.message) {
            promptParam.message = template.message;
        }
        const templateProps = template.props;
        if (Array.isArray(templateProps)) {
            for (const templateProp of templateProps) {
                promptParam[templateProp] = template[templateProp];
            }
        }
        inquirer.prompt([promptParam]).then(async res => {
            const result = res[promptParam.name];
            const selectResult = template.result[String(result)];
            if (typeof selectResult.name === 'string' && typeof selectResult.url === 'string') {
                resolve1(selectResult.name);
            } else if (selectResult.type) {
                const templateName = await ask(selectResult);
                resolve1(templateName);
            } else {
                resolve1();
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
            const newPackageInfo = {...JSON.parse(data), ...packageInfo};
            fs.writeFile(filePath, JSON.stringify(newPackageInfo, null, 4), 'utf8', err => resolve(!Boolean(err)));
        });
    });
}

function getTemplateInfo() {
    const templateInfo = {};

    function findTemplate(target) {
        const keys = Object.keys(target);
        for (const key of keys) {
            const value = target[key];
            if (key === 'name' && typeof value === 'string' && keys.includes('url') && typeof target.url === 'string') {
                templateInfo[value] = target.url;
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                findTemplate(value);
            }
        }
    }

    findTemplate(tpl);
    return templateInfo;
}

export default init;
