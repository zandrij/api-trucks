import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { GlobalError } from "../constants/global_errors";
import { RequestUser } from "../interfaces/users";


const checkJwt = (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(' ').pop();
        const isUser = verifyToken(`${jwt}`);
        // console.log(isUser?._doc)
        if(!isUser) {
            res.status(401).json(GlobalError.SESSION_INVALID)
        } else {
            req.user = isUser as {id: string};
            console.log({jwtByUser});
            next();
        }

    } catch (e) {
        res.status(401).json(GlobalError.SESSION_INVALID)
    }
}

export {checkJwt}