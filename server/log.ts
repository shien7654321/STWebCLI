import chalk from 'chalk';

type LogType = 'warn' | 'error' | 'success' | 'info';

function log(logType: LogType, message?: any, ...rest: any[]) {
    let prefix: string;
    switch (logType) {
        case 'warn': {
            prefix = chalk.black.bgYellow('WARN');
            break;
        }
        case 'error': {
            prefix = chalk.white.bgRed('ERROR');
            break;
        }
        case 'success': {
            prefix = chalk.black.bgGreen('SUCCESS');
            break;
        }
        default: {
            prefix = chalk.black.bgWhite('INFO');
            break;
        }
    }
    // eslint-disable-next-line no-console
    console.log(prefix, message, rest.map((i) => (typeof i === 'string' ? i : JSON.stringify(i, null, 2))).join(' '));
}

export default log;
