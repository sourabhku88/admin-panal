import { Request, Response } from "express";
import bcrypt from "bcrypt";
import httpResponse from "../utils/httpRespons";
import httpErrorResponse from "../utils/httpError";
import logger from "../utils/logger";
import { Users } from "../model/users";

const moduleName = '[ USER CONTROLLER ]:';


export const getUser = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return httpResponse(res, 400, "id required");

        const user = await Users.findOne({ _id: req.params.id, isDeleted: false }, { password: 0, isDeleted: 0 }).populate("role", { name: 1 });

        if (!user) return httpResponse(res, 404, "User not found");

        return httpResponse(res, 200, "User Details", user);
    } catch (error: any) {
        logger.error(`${moduleName} | ${error.message}`);
        return httpErrorResponse(res, error.message);
    }
}

export const getsUser = async (req: Request, res: Response) => {
    try {

        return httpResponse(res, 200, "users", {});
    } catch (error: any) {
        logger.error(`${moduleName} | ${error.message}`);
        return httpErrorResponse(res, error.message);
    }
}