import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { DeleteOneZone, createOnlyZone, getZone, getZones, updateOneZone } from "../services/zones.service";
import { RequestUser } from "../interfaces/users";

/** get all paths */
async function getZonesCtrl(req:Request, res: Response) {
    try {
        const response = await getZones(req.query);
        return res.status(200).json({
            data: response,
            ok: true,
            message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** crear path con multiples zona */
async function createZoneCtrl({body, user}:RequestUser, res: Response) {
    try {
        // const response = await createZone(body, `${user?.type}`);
        return res.status(200).json({
            data: [],
            ok: true,
            message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** crear una zona */
async function createOnlyZoneCtrl({body, user}:RequestUser, res: Response) {
    try {
        const response = await createOnlyZone(body, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** eliminar una zona */
async function deleteOneZoneCtrl({params, user}:RequestUser, res: Response) {
    try {
        const response = await DeleteOneZone(params.id as unknown as number, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            message: "Eliminado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** actualizar una zona */
async function updateOneZoneCtrl({params, user, body}:RequestUser, res: Response) {
    try {
        const response = await updateOneZone(params.id as unknown as number, body, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            message: "actualizado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}


/** obtener una zona */
async function getOneZoneCtrl({params}:RequestUser, res: Response) {
    try {
        const response = await getZone(params.id as unknown as number);
        return res.status(200).json({
            data: response,
            ok: true,
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}


export {
    createZoneCtrl,
    createOnlyZoneCtrl,
    deleteOneZoneCtrl,
    updateOneZoneCtrl,
    getZonesCtrl,
    getOneZoneCtrl
}