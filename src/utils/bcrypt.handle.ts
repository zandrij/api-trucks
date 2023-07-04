import { compare, hash } from "bcryptjs";

const encrypt = async (pass: string) => 
    await hash(pass, 10);

const verified = async (pass: string, passHash: string) => 
    await compare(pass, passHash);

export {encrypt, verified};