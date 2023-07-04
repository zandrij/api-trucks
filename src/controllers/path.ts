import { Request, Response } from "express";
import { createOnlyPath, getPaths } from "../services/path.service";
import { handleHttp } from "../utils/error.handle";
import { RequestUser } from "../interfaces/users";

/** get all paths */
async function getPathCtrl(req:Request, res: Response) {
    try {
        const response = await getPaths(req.query);
        res.status(200).json({
            data: response,
            ok: true,
            message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** crear un path */
async function createOnlyPathCtrl({body, user}:RequestUser, res: Response) {
    try {
        const response = await createOnlyPath(body, `${user?.type}`);
        res.status(200).json({
            response,
            ok: true,
            // message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

export {
    getPathCtrl,
    createOnlyPathCtrl
}