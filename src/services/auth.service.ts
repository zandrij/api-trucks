import { Op } from "sequelize";
import { AuthError } from "../constants/auth_errors";
import { UserInput } from "../interfaces/users";
import User from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { GlobalError } from "../constants/global_errors";
import nodemailer from "nodemailer";
import { account } from "../constants/email";
import { v4 as uuidv4 } from 'uuid';

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

async function changePasswordUser({id}:any, {password, newPassword}: any) {
    const user = await User.findByPk(id);
    if(!user) throw GlobalError.NOT_FOUND_DATA;
    const isCorrect = await verified(password, user.password);
    if (!isCorrect) throw GlobalError.ERROR_VALIDATION;
    const pass = await encrypt(newPassword);
    user.update({password: pass});
    return null;
}

async function lostPassword({email}:any) {
        const transporter = nodemailer.createTransport({
            host: account.host,
            port: account.port,
            // secure: account.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
        try {
            const password: string = uuidv4();
            await transporter.sendMail({
                from: account.user, // sender address
                to: email, // list of receivers
                subject: "Recuperar contraseña", // Subject line
                text: `Tu contraseña temporal es: ${password}`, // plain text body
            })
            // console.log(info.messageId)
            // console.log(nodemailer.getTestMessageUrl(info))
            // return {id: info.messageId};
            const user = await User.findOne({ where: { email: { [Op.eq]: email } } });
            if(!user) throw GlobalError.NOT_FOUND_DATA;
            const pass = await encrypt(password);
            user.update({password: pass});
            return null;
        } catch (error) {
            throw error;
        }
}

export {
    registerOwner,
    registerDrive,
    login,
    registerCustomer,
    changePasswordUser,
    lostPassword
}