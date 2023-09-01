import { Request, Response } from "express";
import { createOneMunicipio, destroyMunicipio, getMunicipios, getOneMunicipio, updateMunicipio } from "../services/municipios.service";
import { handleHttp } from "../utils/error.handle";
import { RequestUser } from "../interfaces/users";

async function getMunicipioCtrl(req:Request, res: Response) {
    try {
        const response = await getMunicipios();
        return res.status(200).json({
            data: response,
            ok: true,
            message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function createOneMunicipioCtrl({body, user}:RequestUser, res: Response) {
    try {
        const response = await createOneMunicipio(body, `${user?.type}`);
        return res.status(200).json({
            response,
            ok: true,
            message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function updateMunicipioCtrl({params, user, body}:RequestUser, res: Response) {
    try {
        const response = await updateMunicipio(params.id as unknown as number, body, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            message: "actualizado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function destroyMunicipioCtrl({params, user}:RequestUser, res: Response) {
    try {
        const response = await destroyMunicipio(params.id as unknown as number, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            message: "Eliminado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function getOneMunicipioCtrl({params}: Request, res: Response) {
    try {
        const response = await getOneMunicipio(params.id as unknown as number);
        return res.status(200).json({
            data: response,
            ok: true,
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}


export {
    getMunicipioCtrl,
    createOneMunicipioCtrl,
    updateMunicipioCtrl,
    destroyMunicipioCtrl,
    getOneMunicipioCtrl
}