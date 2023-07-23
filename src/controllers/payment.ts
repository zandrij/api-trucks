import { Response } from "express";
import { RequestUser } from "../interfaces/users";
import { handleHttp } from "../utils/error.handle";
import { getPayments, paidPayment, updatePaymentStatus } from "../services/payment.service";
import { Storage } from "../interfaces/storage.interface";

/** get all days */
async function getPaymentsCtrl({query, user}:RequestUser, res: Response) {
    try {
        const response = await getPayments(query, `${user?.type}`);
        res.status(200).json({
            data: response,
            ok: true,
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

/** actualizar el estado de una jornada */
async function updatePaymentStatusCtrl({params, user, body}:RequestUser, res: Response) {
    try {
        const response = await updatePaymentStatus(params.id as unknown as number, body.status, body.amount, `${user?.type}`);
        res.status(200).json({
            data: response,
            ok: true,
            message: "actualizado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

// subir comprobantes de pago
const uploadPaidCtrl = async (req: RequestUser, res: Response) => {
    try {
        const {user, file, body, params} = req;
        const dataToRegister: Storage = {
            filename: `${file?.filename}`,
            idUser: `${user?.id}`,
            path: `${file?.path}`,
            type: body.type,
            reference: body.reference
        }
        const response = await paidPayment(params.id as unknown as number, dataToRegister)
        res.status(200).json({
            data: response,
            ok: true,
            message: "actualizado exitosamente"
        });
    } catch (e) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", e);
    }
}

export {
    getPaymentsCtrl,
    updatePaymentStatusCtrl,
    uploadPaidCtrl
}