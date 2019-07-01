import chalk from 'chalk'
import loglevel from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import Optional from './optional'

prefix.reg(loglevel);

const colors = {
    TRACE: chalk.magenta,
    DEBUG: chalk.cyan,
    INFO: chalk.blue,
    WARN: chalk.yellow,
    ERROR: chalk.red,
};

const LEVELS = {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
    SILENT: 'silent',
    TRACE: 'trace',
    WARN: 'warn'
};

const knownLevels = [
    LEVELS.DEBUG,
    LEVELS.ERROR,
    LEVELS.INFO,
    LEVELS.SILENT,
    LEVELS.TRACE,
    LEVELS.WARN
];

prefix.apply(loglevel, {
    format(level, name, timestamp) {
        return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${chalk.green(`${name}:`)}`;
    },
});

let level = LEVELS.INFO;
loglevel.name = "root";

export { LEVELS as levels };
export { loglevel as log };

export function set(newLevel) {
    level = newLevel;
    loglevel.setLevel(newLevel);
}

export function type(value) {
    Optional.for(knownLevels.find(kl => kl === value))
        .orError(`The valid log-levels are [${knownLevels.join(', ')}]`);
}

export function forModule(module) {
    let moduleLog = loglevel.getLogger(module);
    moduleLog.setLevel(level);
    prefix.apply(moduleLog, {
        format(level, name, timestamp) {
            return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${chalk.green(`${name}:`)}`;
        },
    });
    return moduleLog;
}