import { createLogger, format, transports, addColors } from 'winston';
import ENV from '../config/env';
const { combine, colorize, timestamp, printf } = format;
const isProduction = ENV.NODE_ENV === 'production';

interface LogInfo {
    level: string;
    message: string;
    label?: string;
    timestamp?: string;
}


// Custom colors for different log levels
export const LOGGER_MSG_COLORS = {
    error: "bold red",
    warn: "italic yellow",
    info: "cyan",
};

// Adding custom colors to Winston
addColors(LOGGER_MSG_COLORS);

const customFormat = combine(
    colorize({ all: true }),
    timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    printf((info: LogInfo) => {
        return `[${info.timestamp}]: ${info.level} ${info.message}`;
    })
);

const logger = createLogger({
    level: isProduction ? 'error' : 'info',
    transports: [
        new transports.Console({ format: customFormat }),
    ],
});


// class Loggers {
//     info(lable: string, msg: unknown) {
//         logger.info(`[${lable.toLocaleUpperCase()}]: ${msg}`)
//     }

//     error(lable: string, msg: unknown) {
//         logger.error(`[${lable}]: ${msg}`)
//     }
//     warn(lable: string, msg: unknown) {
//         logger.warn(`[${lable}]: ${msg}`)
//     }
// }


export default logger;