import { Response } from "express";
// import { ResponseData } from "../interfaces/responses.interface";
import {ZodError} from 'zod'

const handleHttp = (res:Response, error: string, errorRaw?: any) => {
    return res.status(500).json({
        error,
        ok: false,
        // message: errorRaw,
        message: errorRaw instanceof ZodError ? `${errorRaw.issues.map(inssue => `${inssue.message} ${inssue.path[1] || ''}`)}` : errorRaw,
    });
}

export {handleHttp}

// 