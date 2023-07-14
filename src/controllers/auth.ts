import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { login, registerCustomer, registerDrive, registerOwner } from "../services/auth.service";
import { RequestUser } from "../interfaces/users";

async function loginCtrl(req: Request, res: Response) {
    try {
        const response = await login(req.body);
        res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function registerOwnerCrtl(req: Request, res: Response) {
    try {
        const response = await registerOwner(req.body);
        res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function registerCustomerCrtl({body, user}: RequestUser, res: Response) {
    try {
        const response = await registerCustomer(body, `${user?.type}`);
        res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

// register drive crontroller
async function registerDriveCrtl({body, user}: RequestUser, res: Response) {
    try {
        const response = await registerDrive(body, `${user?.type}`);
        res.status(200).json(response);
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

export {
    registerOwnerCrtl,
    registerDriveCrtl,
    loginCtrl,
    registerCustomerCrtl
}