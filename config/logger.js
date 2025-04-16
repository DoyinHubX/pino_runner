// const pino = require('pino');

// const logger = pino({
//   transport: {
//     target: 'pino-pretty',
//     options: {
//       colorize: true,
//       levelFirst: true,
//       translateTime: 'SYS:standard',
//     },
//   },
//   level: 'info',
// });

// module.exports = logger;



const fs = require('fs');
const pino = require('pino');

// Create logs directory if it doesn't exist
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const logger = pino({
  level: 'info',
  redact: {
    paths: [
      '*.password',      // mask `password` field
      '*.token',         // mask `token` field
      '*.authorization', // mask `authorization` field
    ],
    censor: '[REDACTED]',
  },
  transport: {
    targets: [
      {
        level: 'info',
        target: 'pino/file',
        options: { destination: 'logs/app.log', mkdir: true },
      },
      {
        level: 'error',
        target: 'pino/file',
        options: { destination: 'logs/error.log', mkdir: true },
      },
      {
        level: 'info',
        target: 'pino-pretty', // For pretty console output
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    ],
  },
});

module.exports = logger;

