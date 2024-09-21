import { Request, Response } from "express";
import { Roles } from "../model/rolesl";
import httpResponse from "../utils/httpRespons";
import httpErrorResponse from "../utils/httpError";
import logger from "../utils/logger";

const moduleName = '[ ROLE CONTROLLER ]:';

export const createRole = async (req: Request, res: Response) => {
    try {
        if (!req.body.name) return httpResponse(res, 400, "name is required");

        const roleExist = await Roles.findOne({ name: req.body.name, isDeleted: false });

        if (roleExist) return httpResponse(res, 400, 'role already exist');

        const role = await Roles.create(req.body);
        return httpResponse(res, 201, "Role created successfully", role);
    } catch (error: any) {
        logger.error(`${moduleName} | error.message`);
        return httpErrorResponse(res, error.message);
    }
}


export const getRole = async (req: Request, res: Response) => {
    try {
        const roles = await Roles.find({ isDeleted: false });

        if (!roles.length) return httpResponse(res, 404, 'role not found');

        return httpResponse(res, 200, "Roles", roles);
    } catch (error: any) {
        logger.error(`${moduleName} | error.message`);
        return httpErrorResponse(res, error.message);
    }
}