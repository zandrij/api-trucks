import { Response } from "express";
import { RequestUser } from "../interfaces/users";
import { handleHttp } from "../utils/error.handle";
import { createTruck, getTruck, getTrucks, logicDeleteTrucks, updateTruck } from "../services/truck.service";

async function createTruckCtrl({body, user}:RequestUser, res: Response) {
    try {
        const response = await createTruck(body, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            message: typeof response === 'string' ? "Error al agregar" : "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function getTruckCtrl({params, user}:RequestUser, res: Response) {
    try {
        const response = await getTruck({type: `${user?.type}`, id: params.id as unknown as number});
        return res.status(200).json({
            data: response,
            ok: true,
            message: ""
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}


async function updateTruckCtrl({params, user, body}:RequestUser, res: Response) {
    try {
        const response = await updateTruck(params.id as unknown as number, body, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            message: "actualizado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** lista de camiones con paginación */
async function getTrucksCtrl({query, user}:RequestUser, res: Response) {
    try {
        const response = await getTrucks(query, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** eliminar un usuario */
async function deleteLogicTrucksCtrl({params, user}:RequestUser, res: Response) {
    try {
        const response = await logicDeleteTrucks(params.id as unknown as number, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            message: "Eliminado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}


export {
    getTrucksCtrl,
    getTruckCtrl,
    createTruckCtrl,
    updateTruckCtrl,
    deleteLogicTrucksCtrl
}