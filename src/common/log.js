const chalk = require('chalk');
const error = chalk.red;
const warning = chalk.yellow;
const success = chalk.green;

module.exports = function (logType, message, ...rest) {
    let prefix = '';
    const restMessage = rest.map((i) => (typeof i === 'string' ? i : JSON.stringify(i, null, 2))).join(' ');
    switch (logType) {
        case 'warn': {
            console.log(warning(message), warning(restMessage));
            break;
        }
        case 'error': {
            console.log(error(message), error(restMessage));
            break;
        }
        case 'success': {
            console.log(success(message), success(restMessage));
            break;
        }
        default: {
            console.log(message, restMessage);
            break;
        }
    }
};
