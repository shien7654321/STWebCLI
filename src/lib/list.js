import log from '../common/log.js';
import fs from 'fs';

const {template: tpl} = JSON.parse(fs.readFileSync((new URL('../common/config.json', import.meta.url)).pathname, 'utf8'));

export default async function (options = {}, context = process.cwd()) {
    const templateNames = [];

    function findTemplateName(target) {
        for (const key of Object.keys(target)) {
            const value = target[key];
            if (key === 'name' && typeof value === 'string') {
                templateNames.push(value);
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                findTemplateName(value);
            }
        }
    }

    findTemplateName(tpl);
    const templateNameQuery = options.query;
    let filteredTemplateNames = templateNames;
    if (templateNameQuery) {
        filteredTemplateNames = filteredTemplateNames.filter(item => item.includes(templateNameQuery));
    }
    if (filteredTemplateNames.length) {
        filteredTemplateNames.forEach(item => log('info', item));
    } else {
        log('warn', 'No matching template.');
    }
    process.exit(0);
};
