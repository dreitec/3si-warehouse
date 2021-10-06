"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        if (typeof message !== 'string') {
            message = 'Resource not found';
        }
        this.name = 'NotFoundError';
        this.message = `[${this.name}] ${message}`;
    }
}
exports.NotFoundError = NotFoundError;
exports.notFoundHandler = (req, res, next) => next(new NotFoundError());
exports.errorHandler = (err, req, res, next) => {
    res.status(500).json({ error: err.message });
};
//# sourceMappingURL=errors.js.map