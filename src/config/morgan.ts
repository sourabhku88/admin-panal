import morgan from 'morgan';
import chalk from 'chalk';

export const logsMiddelware = morgan((tokens, req, res) => {
    return [
        chalk.hex('#f78fb3').italic('@' + tokens.date(req, res, 'iso')),
        chalk.hex('#34ace0').italic(tokens.method(req, res)),
        chalk.hex('#ffb142').italic(tokens.status(req, res)),
        chalk.hex('#2ed573').italic(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#ff5252').italic(tokens.url(req, res)),
        // chalk.yellow(tokens['remote-addr'](req, res)),
        // chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
        // chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
    ].join(' ');
});