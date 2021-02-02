import { configure, getLogger } from "log4js";

configure({
  appenders: {
    "console-appender": {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%[[%p]%] - %10.-100f{2} | %7.12l:%7.12o - %[%m%]",
      },
    },
  },
  categories: {
    default: {
      appenders: ["console-appender"],
      enableCallStack: true,
      level: "info",
    },
  },
});

const logger = getLogger("logs");

export { logger };
