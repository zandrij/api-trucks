import { Request, Response } from "express";
import { createOnlyPath, getOnePath, getPaths, updatePath } from "../services/path.service";
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

/** get paths */
async function getOnePathCtrl(req: Request, res: Response) {
    try {
        const response = await getOnePath(req.params.id as unknown as number);
        res.status(200).json({
            data: response,
            ok: true,
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

/** agregar usuario a un path */
// async function AddUserToPathCtrl({body, user}:RequestUser, res: Response) {
//     try {
//         const response = await AddUserToPath(body, `${user?.type}`);
//         res.status(200).json({
//             response,
//             ok: true,
//             message: "agregado exitosamente"
//         });
//     } catch (error) {
//         handleHttp(res, "INTERNAL_SERVER_ERROR", error);
//     }
// }

/** remove user from path */
// async function removeUserToPathCtrl({query, user}:RequestUser, res: Response) {
//     try {
//         const response = await removeUserToPath(query, `${user?.type}`);
//         res.status(200).json({
//             response,
//             ok: true,
//             message: "Eliminado con exito"
//         });
//     } catch (error) {
//         handleHttp(res, "INTERNAL_SERVER_ERROR", error);
//     }
// }


/** actualizar un path */
async function updatePathCtrl({params, user, body}:RequestUser, res: Response) {
    try {
        const response = await updatePath(params.id as unknown as number, body, `${user?.type}`);
        res.status(200).json({
            data: response,
            ok: true,
            message: "actualizado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** obtener los usuarios de un path */
// async function getOnePathWithUsersCtrl({params, user}:RequestUser, res: Response) {
//     try {
//         const response = await getOnePathWithUsers(params.id as unknown as number, `${user?.type}`);
//         res.status(200).json({
//             data: response,
//             ok: true,
//             message: ""
//         });
//     } catch (error) {
//         handleHttp(res, "INTERNAL_SERVER_ERROR", error);
//     }
// }



export {
    getPathCtrl,
    createOnlyPathCtrl,
    // AddUserToPathCtrl,
    // removeUserToPathCtrl,
    updatePathCtrl,
    // getOnePathWithUsersCtrl,
    getOnePathCtrl
}