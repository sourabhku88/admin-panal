import express, { Application, Request, Response } from 'express'
import helmet from "helmet";
import cors from 'cors';
import ENV from './config/env';
import router from './router';
import httpResponse from './utils/httpRespons';
import { logsMiddelware } from './config/morgan';
import logger from './utils/logger';
import { apiAuth } from './middleware/apiAuth';
import { connection } from './config/databaseConnection';
const moduleName = '[ SERVER ]:';


const app: Application = express();


// middlewares
app.use(helmet());
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use(logsMiddelware);

// Database configuration
connection();


// routes
app.use(ENV.API_V as string, apiAuth, router);
app.use('*', apiAuth, (req: Request, res: Response) =>
    httpResponse(res, 404, `${req.originalUrl} Not Found`)
);

app.listen(ENV.PORT, () => {
    logger.info(`${moduleName} ${ENV.NODE_ENV} server running on ${ENV.PORT}`);
});
