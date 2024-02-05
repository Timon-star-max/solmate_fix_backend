"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var logger = (0, winston_1.createLogger)({
    transports: [new winston_1.transports.File({
            dirname: "logs",
            filename: 'app.log'
        })],
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(function (_a) {
        var timestamp = _a.timestamp, level = _a.level, message = _a.message, service = _a.service;
        return "[".concat(timestamp, "] ").concat(level, ": ").concat(message);
    }))
});
exports.default = logger;
//# sourceMappingURL=logger.js.map