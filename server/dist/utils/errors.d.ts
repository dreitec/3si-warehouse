export declare class NotFoundError extends Error {
    constructor(message?: any);
}
export declare const notFoundHandler: (req: any, res: any, next: any) => any;
export declare const errorHandler: (err: any, req: any, res: any, next: any) => void;
