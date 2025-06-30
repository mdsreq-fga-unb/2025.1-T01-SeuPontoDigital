import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}]${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}]${message}`;
                })
            )
        }),
        new winston.transports.File({ 
            filename: 'logs/combined.log',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}]${message}`;
                })
            )
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}]${message}`;
                })
            )
        })
    ]
});

// Redireciona console.log e console.error para o Winston
console.log = (...args) => logger.info(args.join(" "));
console.error = (...args) => {
  for (const arg of args) {
    if (typeof arg === 'object') {
      logger.error(JSON.stringify(arg, null, 2));
    } else {
      logger.error(arg);
    }
  }
};

// Create a child logger with request context
export const createRequestLogger = (req) => {
    return logger.child({});
};

export default logger; 