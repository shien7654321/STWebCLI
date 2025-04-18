import path from 'path';
import winston from 'winston';

interface IStackInfo {
    method: string;
    path: string;
    line: string;
    pos: string;
    file: string;
}

function getStackInfo(stackIndex: number): IStackInfo | undefined {
    const stackList: string[] = new Error().stack?.split('\n').slice(3) || [];
    const stackReg: RegExp = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    const stackReg2: RegExp = /at\s+(.*):(\d*):(\d*)/gi;
    const stack: string = stackList[stackIndex] || stackList[0];
    const stackRes: RegExpExecArray | null = stackReg.exec(stack) || stackReg2.exec(stack);
    if (stackRes && (stackRes.length === 5 || stackRes.length === 4)) {
        const stackMethod = stackRes.length === 5 ? stackRes[1] : '';
        const stackPath = stackRes.length === 5 ? stackRes[2] : stackRes[1];
        const stackLine = stackRes.length === 5 ? stackRes[3] : stackRes[2];
        const stackPos = stackRes.length === 5 ? stackRes[4] : stackRes[3];
        return {
            method: stackMethod,
            path: stackPath,
            line: stackLine,
            pos: stackPos,
            file: path.basename(stackPath),
        };
    }
    return undefined;
}

function formatLogArguments(...args): any {
    let newArgs: any[] = [...args];
    const assembleHandler = (stackInfo?: IStackInfo) => {
        let stackPrefix = '>';
        if (stackInfo) {
            let { path: stackInfoPath } = stackInfo;
            if (stackInfoPath.startsWith('/')) {
                stackInfoPath = `file://${stackInfoPath}`;
            }
            stackPrefix = `${decodeURIComponent(stackInfoPath)}:${stackInfo.line}:${stackInfo.pos} >`;
        }
        let msg = '';
        newArgs.forEach((newArg) => {
            if (newArg instanceof Object) {
                try {
                    msg += ` ${JSON.stringify(newArg)}`;
                } catch {
                    msg += ` ${newArg}`;
                }
            } else {
                msg += ` ${newArg}`;
            }
        });
        newArgs = msg ? [stackPrefix + msg] : [];
        return newArgs;
    };
    if (process.env.NODE_ENV === 'development') {
        const stackInfo = getStackInfo(1);
        assembleHandler(stackInfo);
    } else {
        assembleHandler();
    }
    return newArgs;
}

function createLogger() {
    const loggerFormat = winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        winston.format.printf((info) => `${info.level} ${info.timestamp} ${info.message}`),
    );
    const transports: any[] = [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), loggerFormat),
        }),
    ];
    if (process.env.NODE_ENV !== 'development') {
        let dirname = path.join(__dirname, 'logs');
        if (__dirname.endsWith('base')) {
            dirname = path.join(__dirname, '../../logs');
        }
        transports.push(
            new winston.transports.File({
                filename: 'app.log',
                dirname,
                format: loggerFormat,
                maxsize: 10 * 1024 * 1024,
                maxFiles: 1,
            }),
        );
    }
    return winston.createLogger({
        level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
        transports,
    });
}

const logger = createLogger();

const log = {
    error(...args) {
        logger.error(formatLogArguments(...args));
    },
    warn(...args) {
        logger.warn(formatLogArguments(...args));
    },
    info(...args) {
        logger.info(formatLogArguments(...args));
    },
    http(...args) {
        logger.http(formatLogArguments(...args));
    },
    verbose(...args) {
        logger.verbose(formatLogArguments(...args));
    },
    debug(...args) {
        logger.debug(formatLogArguments(...args));
    },
    silly(...args) {
        logger.silly(formatLogArguments(...args));
    },
};

export default log;
