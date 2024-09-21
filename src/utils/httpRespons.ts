import { Request, Response } from 'express'

const httpResponse = (res: Response, statusCode: number, msg: string, data: unknown = []) => {
    const response = {
        statusCode,
        msg,
        result: data
    }
    res.status(statusCode).json(response);
}

export default httpResponse;