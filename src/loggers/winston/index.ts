import moment from "moment";
import winston, { format } from "winston";
import "winston-daily-rotate-file"; // Attaches new transport to winston.transports

// Setup console transport
let consoleOptions = {
  level: "info",
  handleExceptions: true,
  stderrLevels: ["error"],
  silent: process.env.SILENT === "true",
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf((info) => {
      const { level, message, timestamp } = info;
      return `[${level}] ${moment(timestamp).format(
        "YY-MM-DD HH:mm:ss"
      )} -- ${message}`;
    })
  ),
};
let consoleTransport = new winston.transports.Console(consoleOptions);

// Setup file transport
const transport = new winston.transports.DailyRotateFile({
  filename: `API_${process.env.NODE_ENV as string}.log`,
  dirname: `./logs`,
  frequency: undefined, // Rely on date pattern, rotate daily
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "14d",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
});

transport.on("rotate", (oldFileName, newFilename) => {
  logger.info(`ROTATING LOGS. OLD: ${oldFileName}  -- NEW: ${newFilename}`);
});

// Only enable file logging in production
const transports =
  process.env.NODE_ENV === "production"
    ? [consoleTransport, transport]
    : [consoleTransport];

// Handles logs and logs from morgan
const logger = winston.createLogger({
  transports,
  exitOnError: false, // do not exit on handled exceptions
});

export default logger;
