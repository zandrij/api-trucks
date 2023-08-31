import { Request, Response } from "express";
import { createOneMunicipio, getMunicipios, updateMunicipio } from "../services/municipios.service";
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

export {
    getMunicipioCtrl,
    createOneMunicipioCtrl,
    updateMunicipioCtrl
}