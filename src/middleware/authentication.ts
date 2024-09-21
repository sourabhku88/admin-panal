import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import httpErrorResponse from '../utils/httpError';
import logger from '../utils/logger';
import httpResponse from '../utils/httpRespons';
import jwt from 'jsonwebtoken';
import ENV from '../config/env';


const moduleName = '[ AUTHENTICATION ]:'


declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
        }
    }
}
export const authentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.headers.authorization?.split(' ')[1];
        if (!token) return httpResponse(res, 401, 'Invalid token');

        const usersDetails: string | JwtPayload = jwt.verify(token, ENV.JWT_SECRET as string)
        req.user = usersDetails;
        next();
    } catch (error: any) {
        logger.error(`${moduleName} ${error.message}`);
        return httpErrorResponse(res, error.message);
    }
}