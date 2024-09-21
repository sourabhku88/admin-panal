import { NextFunction, Request, Response } from "express";
import httpErrorResponse from "../utils/httpError";
import httpResponse from "../utils/httpRespons";
import ENV from "../config/env";
import logger from "../utils/logger";
const moduleName = '[ API AUTH MIDDLEWARE ]:';

export const apiAuth = (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers["api-token"];
        if (!token) return httpResponse(res, 401, "Access Denied");

        if (token !== ENV.API_TOKEN) return httpResponse(res, 401, "Access Denied or invalid token.");

        next();

    } catch (error: any) {
        logger.error(`${moduleName} | ${JSON.stringify(error)}`);
        httpErrorResponse(res, error.message);
    }
}
