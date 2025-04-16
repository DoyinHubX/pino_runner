const pino = require('pino');
const path = require('path');

// Create a transport for pretty printing in development
const transport = pino.transport({
  targets: [
    {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
        ignore: 'pid,hostname',
      },
      level: 'info'
    },
    {
      target: 'pino/file',
      options: {
        destination: path.join(__dirname, '../logs/app.log'),
        mkdir: true
      },
      level: 'trace'
    }
  ]
});

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    formatters: {
      level: (label) => ({ level: label }),
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  },
  transport
);

module.exports = logger;