import { NextFunction, Request, Response } from "express";
import {AnyZodObject} from 'zod'
import { handleHttp } from "../utils/error.handle";
import { GlobalError } from "../constants/global_errors";

export const schemaValidator =
(schema: AnyZodObject) => 
(req: Request, res: Response, next: NextFunction) => {
    try {
        const {params, query} = schema.parse({body: req.body, params: req.params, query: req.query});
        req.params = params;
        req.query = query;
        next();
    } catch (error) {
        handleHttp(res, GlobalError.ERROR_VALIDATION, error)
        return;
    }
    
}