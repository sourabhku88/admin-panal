import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import httpResponse from "../utils/httpRespons";
import { Users } from "../model/users";
import ENV from "../config/env";
import httpErrorResponse from "../utils/httpError";
import logger from "../utils/logger";

const moduleName = "[ AUTH ]:";

export const login = async (req: Request, res: Response) => {
    try {
        if (!req.body.username || !req.body.password) return httpResponse(res, 401, "Username and password are required");

        const user = await Users.findOne({ username: req.body.username, isDeleted: false }).populate("role", { name: 1 });
        if (!user) return httpResponse(res, 401, "Invalid username or password");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return httpResponse(res, 401, "Invalid username or password");

        const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, ENV.JWT_SECRET as string, { expiresIn: ENV.JWT_EXPIRATION_TIME });

        return httpResponse(res, 200, "Login successful", { token, userId: user._id, username: user.username, role: user.role });
    } catch (error: any) {
        logger.error(`${moduleName} | ${error.message}`);
        return httpErrorResponse(res, error.message);
    }
}


export const signUp = async (req: Request, res: Response) => {
    try {
        if (!req.body.name) return httpResponse(res, 400, "name is required");
        if (!req.body.email) return httpResponse(res, 400, "email is required");
        if (!req.body.password) return httpResponse(res, 400, "password is required");
        if (!req.body.username) return httpResponse(res, 400, "username is required");
        if (!req.body.roleId) return httpResponse(res, 400, "roleId is required");

        const existUser = await Users.findOne({ email: req.body.email, isDeleted: false });
        const existUsername = await Users.findOne({ username: req.body.username, isDeleted: false });

        if(existUser) return httpResponse(res, 400, "User is already exists!");
        if(existUsername) return httpResponse(res, 400, "username is already exists!");


        const hashPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashPassword;
        req.body.role = req.body.roleId;
        const user = await Users.create(req.body);

        return httpResponse(res, 201, "User created successfully", user);
    } catch (error: any) {
        logger.error(`${moduleName} | ${error.message}`);
        return httpErrorResponse(res, error.message);
    }
}
