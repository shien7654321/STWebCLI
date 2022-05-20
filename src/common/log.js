const chalk = require('chalk');
const error = chalk.red;
const warning = chalk.yellow;
const success = chalk.green;

module.exports = function (str, type) {
    switch (type) {
        case 'SUCCESS': {
            console.log(success(str));
            break;
        }
        case 'WARNING': {
            console.log(warning(str));
            break;
        }
        case 'ERROR': {
            console.log(error(str));
            break;
        }
        default: {
            console.log(str);
            break;
        }
    }
};
