import { Response } from "express";
import { RequestUser } from "../interfaces/users";
import { getUserId, getUserImei, getUsers, logicDeleteUser, updateUser } from "../services/user.service";
import { handleHttp } from "../utils/error.handle";
import { generateToken } from "../utils/jwt.handle";

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


/** obtener una zona */
async function getUserIdCrtl({params}:RequestUser, res: Response) {
    try {
        const response = await getUserId(params.id as unknown as number);
        res.status(200).json({
            data: response,
            ok: true,
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function getUserImeiCrtl({params}:RequestUser, res: Response) {
    try {
        const response = await getUserImei(params.device as unknown as string);
        if(response) {
            const token = generateToken({ id: response.id, type: response.type });
            let ressponse = {...response, token};
            res.status(200).json({
                data: ressponse,
                ok: true,
            });
        }
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}
export {
    getUsersCtrl,
    updateUserCtrl,
    deleteLoginUserCtrl,
    getUserIdCrtl,
    getUserImeiCrtl
}