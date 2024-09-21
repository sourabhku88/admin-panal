import { Request, Response } from 'express'

const httpErrorResponse = (res: Response, error: unknown = [], msg: string = 'Internal Server Error',) => {
    const response = {
        statusCode: 500,
        msg,
        result: [],
        error: error
    }
    res.status(500).json(response);
}

export default httpErrorResponse;