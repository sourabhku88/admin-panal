import { Request, Response } from "express";
import os from 'os'
import httpResponse from "../utils/httpRespons";
import httpErrorResponse from "../utils/httpError";
import logger from "../utils/logger";

const moduleName = '[ HEALTH CONTROLLER ]:'

export const healthCheck = (req: Request, res: Response) => {
    try {
        const data = {
            env:process.env.NODE_ENV,
            pid: process.pid,
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            nodeVersion: process.versions.node,
            platform: os.platform(),
            uptime: `${process.uptime().toFixed(2)} sec`,
            totalCup: os.cpus().length,
            memory: {
                totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
                freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
                used: `${((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2)} MB`,
                heapTotal: `${((process.memoryUsage().heapTotal) / 1024 / 1024).toFixed(2)} MB`,
                heapUsed: `${((process.memoryUsage().heapUsed) / 1024 / 1024).toFixed(2)} MB`
            }
        }
        httpResponse(res, 200, 'Server is running', data);
    } catch (error: any) {
        logger.error(`${moduleName} Error in healthcheck| ${error}`)
        httpErrorResponse(res, error.message);
    }
}