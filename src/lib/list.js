const log = require('../common/log');
const tpl = require('../common/config.json').template;

module.exports = async function (options = {}, context = process.cwd()) {
    const templateNames = [];
    function findTemplateName(target) {
        for (const key of Object.keys(target)) {
            const value = target[key];
            if (key === 'name' && typeof value === 'string') {
                templateNames.push(value);
            } else if (typeof value === "object" && !Array.isArray(value)) {
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
        filteredTemplateNames.forEach(item => log(item));
    } else {
        log('No matching template.', 'WARNING');
    }
    process.exit(0);
};
