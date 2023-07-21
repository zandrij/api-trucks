import { sign, verify } from "jsonwebtoken";
const JWT_SECRET = <string>process.env.JWT_SECRET;


const generateToken = (data: any) =>
    sign(data, JWT_SECRET, {expiresIn: "30d"})

const verifyToken = (jwt: string) => verify(jwt, JWT_SECRET);

export {generateToken, verifyToken};