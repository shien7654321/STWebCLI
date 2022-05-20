const log = require('../common/log');
const templates = require('../common/config.json').templates;

module.exports = async function (options = {}, context = process.cwd()) {
    const templateNameQuery = options.query;
    let filteredTemplates = templates;
    if (templateNameQuery) {
        filteredTemplates = filteredTemplates.filter(item => item.name.includes(templateNameQuery));
    }
    if (filteredTemplates.length) {
        filteredTemplates.forEach(item => log(item.name));
    } else {
        log('No matching template.', 'WARNING');
    }
    process.exit(0);
};
