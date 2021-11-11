import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "../../../src/backend/Interfaces";

export class NotFoundError extends Error {
  constructor(message?: any) {
    super(message);
    if (typeof message !== "string") {
      message = "Resource not found";
    }
    this.name = "NotFoundError";
    this.message = `[${this.name}] ${message}`;
  }
}

export const notFoundHandler = (
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>,
  next: any
) => next(new NotFoundError());

export const errorHandler = (
  err: any,
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>,
  next: any
) => {
  res.status(500).json({ error: err.message });
};
