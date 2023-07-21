import { Op } from "sequelize";
import { GlobalError } from "../constants/global_errors";
import User from "../models/user";
import { columnsUser } from "../constants/columns";

// obtener usuarios [todos o por tipo]
async function getUsers({limit, page, typeUser}: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const {count, rows} = await User.findAndCountAll({
        limit,
        offset,
        where: !typeUser ? {status: {[Op.eq]: 'active'}} : {[Op.and]: [{type: typeUser}, {status: 'active'}]},
        order: [['id', 'DESC']],
        attributes: ['id', 'name', 'lastName', 'email', 'dni', 'type']
    });
    return {total: count, rows, limit, page};
    // return {limit, offset, page}
}

// actualizar un usuario
async function updateUser(id:number, data: any, type: string) {
    // if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const user = await User.findByPk(id, {attributes: columnsUser});
    // if(user?.type === 'owner' &&) 
    if(!user) return GlobalError.NOT_FOUND_DATA;
    user.update(data)
    // day.update({status});
    return user.toJSON();
}

// actualizar un usuario
async function logicDeleteUser(id:number, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const user = await User.findByPk(id);
    if(!user) return GlobalError.NOT_FOUND_DATA;
    user.update({status: 'deleted'})
    // day.update({status});
    return user.toJSON();
}

export {
    getUsers,
    updateUser,
    logicDeleteUser
}