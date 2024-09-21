import mongoose from "mongoose";
import logger from "../utils/logger";
import ENV from "./env";

const moduleName = "[ CONNECTION ]:";

export const connection = async () => {
    try {
        await mongoose.connect(ENV.DB_URL as string);
        logger.info(`${moduleName} connection established`);
    } catch (error: any) {
        logger.error(`${moduleName} Error connecting to MongoDB ${error.message}`);
    }
};