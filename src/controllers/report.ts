import { Response } from "express";
import { RequestUser } from "../interfaces/users";
import { getCustomerBuyTotal, getDriverDayEnd, getPathWithDays } from "../services/report.service";
import { handleHttp } from "../utils/error.handle";
import { generateExcelReport } from "../services/excel.service";

/** get all paths */
async function getCustomerBuyCtrl({user, query}:RequestUser, res: Response) {
    try {
        const response = await getCustomerBuyTotal(query, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            // message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function getPathWithDaysCtrl({user, query}:RequestUser, res: Response) {
    try {
        const response = await getPathWithDays(query, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            // message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function getDriverDayEndCtrl({user, query}:RequestUser, res: Response) {
    try {
        const response = await getDriverDayEnd(query, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            // message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

async function generateExcelReportCtrl({user, query}:RequestUser, res: Response) {
    try {
        const response = await generateExcelReport(query, `${user?.type}`);
        return res.status(200).json({
            data: response,
            ok: true,
            // message: "agregado exitosamente"
        });
    } catch (error) {
        handleHttp(res, "INTERNAL_SERVER_ERROR", error);
    }
}

export {
    getCustomerBuyCtrl,
    getPathWithDaysCtrl,
    generateExcelReportCtrl,
    getDriverDayEndCtrl
}