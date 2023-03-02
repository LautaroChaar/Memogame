import dotenv from 'dotenv';
import log4js from 'log4js';

dotenv.config();

log4js.configure({
  appenders: {
    console: {type: 'console'},

    warnFile: { type: 'file', filename: 'logs/warn.log'},
    errorFile: { type: 'file', filename: 'logs/error.log'},

    loggerConsole: { type: 'logLevelFilter', appender: 'console', level: 'info'},
    loggerWarn: { type: 'logLevelFilter', appender: 'warnFile', level: 'warn'},
    loggerError: { type: 'logLevelFilter', appender: 'errorFile', level: 'error'},
  },
  categories: {
    default: {
      appenders: ['loggerConsole', 'loggerWarn', 'loggerError'],
      level: 'all'
    },
    production: {
      appenders: ['loggerError'],
      level: 'all'
    }
  }
});

let logger = null;

if (process.env.NODE_ENV == 'production') {
  logger = log4js.getLogger('production')
} else {
  logger = log4js.getLogger()
}

export { logger };
