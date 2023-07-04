import { Op } from "sequelize";
import { AuthError } from "../constants/auth_errors";
import { UserAttributes, UserInput } from "../interfaces/users";
import User from "../models/user.model";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { GlobalError } from "../constants/global_errors";

interface AuthLogin {
    user: string;
    password: string;
}

async function login({user,password}: AuthLogin) {
    const result = await User.findOne({where: {[Op.or]: {email: {[Op.eq]: user}, dni: {[Op.eq]: user}}}});
    if(!result) return AuthError.USER_OR_PASSWORD_INVALID;
    const isCorrect = await verified(password, result.password);
    if(!isCorrect) return AuthError.USER_OR_PASSWORD_INVALID;
    const token = generateToken({id: result.id, type: result.type})
    return {
        data: result,
        token
    };
}

// registrar drive
async function registerDrive(data: UserInput, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const checkEmail = await User.findOne({where: {[Op.or]: {email: {[Op.eq]: data.email}, dni: {[Op.eq]: data.dni}}}})
    if(checkEmail) return AuthError.USER_OR_PASSWORD_INVALID;
    const pass = await encrypt(data.password);
    const newUser = await User.create({...data, password: pass, type: 'drive'});
    // const token = generateToken({id: newUser.id, type: 'drive'})
    return {
        data: newUser,
    };
}

// registrar admin
async function registerOwner(data: UserInput) {
    const checkEmail = await User.findOne({where: {email: data.email}})
    if(checkEmail) return AuthError.USER_OR_PASSWORD_INVALID;
    const pass = await encrypt(data.password);
    const newUser = await User.create({...data, password: pass, type: 'owner'});
    const token = generateToken({id: newUser.id, type: 'owner'})
    return {
        data: newUser,
        token
    };
}

export {
    registerOwner,
    registerDrive,
    login
}