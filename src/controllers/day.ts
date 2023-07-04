import { Request, Response } from "express";
import { RequestUser } from "../interfaces/users";
import { handleHttp } from "../utils/error.handle";
import { createDay, getDayOfDriver, getDays, updateDayRoute, updateDayStatus } from "../services/day.service";

async function createDayCtrl({body, user}:RequestUser, res: Response) {
    try {
        const response = await createDay(body, `${user?.type}`);
        res.status(200).json({
            data: response,
            ok: true,
            message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function getDayOfDriverCtrl({user}:RequestUser, res: Response) {
    try {
        const response = await getDayOfDriver(user);
        res.status(200).json({
            data: response,
            ok: true,
            message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** actualizar el estado de una jornada */
async function updateDayStatusCtrl({params, user, body}:RequestUser, res: Response) {
    try {
        const response = await updateDayStatus(params.id as unknown as number, body.status, `${user?.type}`);
        res.status(200).json({
            data: response,
            ok: true,
            message: "actualizado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function updateDayRouteCtrl({params, user, body}:RequestUser, res: Response) {
    try {
        const response = await updateDayRoute(params.id as unknown as number, body, `${user?.type}`);
        res.status(200).json({
            data: response,
            ok: true,
            message: "actualizado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** get all days */
async function getDaysCtrl({query, user}:RequestUser, res: Response) {
    try {
        const response = await getDays(query, `${user?.type}`);
        res.status(200).json({
            data: response,
            ok: true,
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

export {
    createDayCtrl,
    getDayOfDriverCtrl,
    updateDayStatusCtrl,
    updateDayRouteCtrl,
    getDaysCtrl
}