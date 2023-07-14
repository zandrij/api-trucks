import { Response } from "express";
import { RequestUser } from "../interfaces/users";
import { getUsers, logicDeleteUser, updateUser } from "../services/user.service";
import { handleHttp } from "../utils/error.handle";

/** get user actives [all, customer, drive and owner] */
async function getUsersCtrl({query, user}:RequestUser, res: Response) {
    try {
        const response = await getUsers(query, `${user?.type}`);
        res.status(200).json({
            data: response,
            ok: true,
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function updateUserCtrl({params, user, body}:RequestUser, res: Response) {
    try {
        const response = await updateUser(params.id as unknown as number, body, `${user?.type}`);
        res.status(200).json({
            data: response,
            ok: true,
            message: "actualizado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** eliminar una zona */
async function deleteLoginUserCtrl({params, user}:RequestUser, res: Response) {
    try {
        const response = await logicDeleteUser(params.id as unknown as number, `${user?.type}`);
        res.status(200).json({
            data: response,
            ok: true,
            message: "Eliminado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}


export {
    getUsersCtrl,
    updateUserCtrl,
    deleteLoginUserCtrl
}