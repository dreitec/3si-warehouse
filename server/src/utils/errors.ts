export class NotFoundError extends Error {
    constructor(message?: any) {
        super(message);
        if (typeof message !== 'string') {
            message = 'Resource not found';
        }
        this.name = 'NotFoundError';
        this.message = `[${this.name}] ${message}`;
    }
}

export const notFoundHandler = (req, res, next) => next(new NotFoundError());

export const errorHandler = (err, req, res, next) => {
	res.status(500).json({ error: err.message });
};
