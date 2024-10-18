// src/services/logger.js

import { createLogger, format, transports } from 'winston';
import 'winston-transport-http'; // Ensure HTTP transport is available
import throttle from 'lodash/throttle'; // Import throttle instead of debounce

const { combine, timestamp, json, prettyPrint } = format;

// Initialize the logger first
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    // Remove File transport as it's not feasible in browser environments
    // new transports.File({ filename: 'frontend-logs.log', level: 'error' }),
    new transports.Http({
      host: process.env.VUE_APP_LOGSTASH_HOST,
      port: process.env.VUE_APP_LOGSTASH_PORT,
      path: process.env.VUE_APP_LOGSTASH_PATH,
      ssl: process.env.VUE_APP_LOGSTASH_SSL === 'true',
      auth: {
        username: process.env.VUE_APP_LOGSTASH_USERNAME,
        password: process.env.VUE_APP_LOGSTASH_PASSWORD,
      },
      // Optional: You can add headers or other configurations here
    }),
  ],
});

// Throttling to prevent log flooding
const throttledInfo = throttle((message, meta) => {
  logger.info(message, meta);
}, 1000, { leading: true, trailing: false }); // Throttle to 1 log per second

const throttledError = throttle((message, meta) => {
  logger.error(message, meta);
}, 1000, { leading: true, trailing: false }); // Throttle to 1 log per second

export { throttledInfo as info, throttledError as error };
