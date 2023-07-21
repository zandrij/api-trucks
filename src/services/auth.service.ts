import { Op } from "sequelize";
import { AuthError } from "../constants/auth_errors";
import { UserAttributes, UserInput } from "../interfaces/users";
import User from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { GlobalError } from "../constants/global_errors";
import { columnsUser } from "../constants/columns";

interface AuthLogin {
    user: string;
    password: string;
}

async function login({ user, password }: AuthLogin) {
    const result = await User.findOne({ where: { [Op.or]: { email: { [Op.eq]: user }, dni: { [Op.eq]: user } } } });
    if (!result) return AuthError.USER_OR_PASSWORD_INVALID;
    if(result.status === 'banned') GlobalError.NOT_PERMITED_ACCESS;
    const isCorrect = await verified(password, result.password);
    if (!isCorrect) return AuthError.USER_OR_PASSWORD_INVALID;
    const token = generateToken({ id: result.id, type: result.type });
    const info = { ...result.get({ plain: true }) };
    delete (info as any).password;

    return {
        data: info,
        token
    };
}

// registrar drive
async function registerDrive(data: UserInput, type: string) {
    console.log({data})
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const checkEmail = await User.findOne({where: {[Op.or]: {email: {[Op.eq]: data.email}, dni: {[Op.eq]: data.dni}}}})
    console.log({checkEmail})
    if(checkEmail) return AuthError.USER_OR_PASSWORD_INVALID;
    const pass = await encrypt(data.password);

    const newUser = await User.create({...data, password: pass, type: 'drive', status: 'active'});
    // const token = generateToken({id: newUser.id, type: 'drive'})
    const result = newUser.toJSON();
    delete (result as any).password;
    return {
        data: result,
    };
}

// registrar customer
async function registerCustomer(data: UserInput, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const checkEmail = await User.findOne({where: {[Op.or]: {email: {[Op.eq]: data.email}, dni: {[Op.eq]: data.dni}}}})
    if(checkEmail) return AuthError.USER_OR_PASSWORD_INVALID;
    const pass = await encrypt("12345678");
    const newUser = await User.create({...data, password: pass, type: 'customer', status: "active"});
    // const token = generateToken({id: newUser.id, type: 'drive'})
    const result = newUser.toJSON();
    delete (result as any).password;
    return {
        data: result,
    };
}

// registrar admin
async function registerOwner(data: UserInput) {
    const checkEmail = await User.findOne({where: {email: data.email}});
    if(checkEmail) return AuthError.USER_OR_PASSWORD_INVALID;
    const pass = await encrypt(data.password);
    const newUser = await User.create({...data, password: pass, type: 'owner', status: 'active'});
    const token = generateToken({id: newUser.id, type: 'owner'})
    let user = {...newUser.get({plain: true})};
    delete (user as any).password;
    return {
        data: user,
        token
    };

}

export {
    registerOwner,
    registerDrive,
    login,
    registerCustomer
}