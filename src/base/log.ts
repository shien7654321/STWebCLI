import winston from 'winston';
import path from 'path';

interface IStackInfo {
    method: string;
    path: string;
    line: string;
    pos: string;
    file: string;
}

function getStackInfo(stackIndex: number): IStackInfo | undefined {
    const stackList: string[] = (new Error()).stack?.split('\n').slice(3) || [];
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
        const stackPrefix = stackInfo ? `${stackInfo.path}:${stackInfo.line}:${stackInfo.pos} >` : '>';
        let msg = '';
        newArgs.forEach((newArg) => {
            if (newArg instanceof Object) {
                msg += ` ${JSON.stringify(newArg)}`;
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

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        winston.format.colorize(),
        winston.format.printf((info) => `${info.level} ${info.timestamp} ${info.message}`),
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

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
