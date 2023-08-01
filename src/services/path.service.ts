import {Op, Sequelize} from 'sequelize';
import { GlobalError } from "../constants/global_errors";
import Path from "../models/Path";
import User from "../models/user";
import { PathUserAttributes } from "../interfaces/pathuser.interface";
import { columnsUser } from "../constants/columns";
import Day from "../models/day.model";

async function getPaths({limit, page}: any) {
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const rows = await Path.findAll({
        limit,
        offset,
        // subQuery: false,
        order: [['id', 'DESC']],
    });
    // const user = await User.findByPk(3);
    // rows[0].addUser(user as User);
    return {total: 0, rows, limit, page}
    // return {total: count.length, rows, limit, page};


    
    // return {limit, offset, page}
}



async function getOnePath(id:number) {
    const path = await Path.findOne({
        order: [['id', 'DESC']],
        where: {id},
        // include: [
        //     {
        //         model: Zones
        //     }
        // ] 
    });

    if(!path) throw GlobalError.NOT_FOUND_DATA;
    return path.toJSON();
}

async function createOnlyPath(data:any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const ph = await Path.create(data);
    return ph.toJSON();
}

//! agrega un usuario a un path
// async function AddUserToPath(data:PathUserAttributes, type: string) {
//     if(type !== 'owner') throw GlobalError.NOT_PERMITED_ACCESS;
//     const path = await Path.findByPk(data.pathId);
//     const result = await path?.getUsers();
//     let flag = false;
//     for (let i = 0; i < result!.length; i++) {
//         if(result![i].id === data.userId) {
//             flag = true;
//             break;
//         }
//     }
//     if(flag) {
//         throw GlobalError.DATA_ALREADY_EXIST
//     }
//     const user = await User.findByPk(data.userId, {attributes: columnsUser});
//     if(!user) {
//         throw GlobalError.NOT_FOUND_DATA;
//     }
//     path?.addUser(user);
//     return user.toJSON();
// }

//! agrega un usuario a un path
// async function removeUserToPath({pathId, userId}:any, type: string) {
//     if(type !== 'owner') throw GlobalError.NOT_PERMITED_ACCESS;
//     const path = await Path.findByPk(pathId);
//     const user = await User.findByPk(userId, {attributes: columnsUser});
//     if(!user) {
//         throw GlobalError.NOT_FOUND_DATA;
//     }
//     await path?.removeUser(user);
//     return user?.toJSON();
// }

async function updatePath(id:number, data: any, type: string) {
    if(type !== 'owner') throw GlobalError.NOT_PERMITED_ACCESS;
    const path = await Path.findByPk(id);
    if(!path) return GlobalError.NOT_FOUND_DATA;
    path.update(data);
    return path.toJSON();
}

// async function getOnePathWithUsers(id: number, type: string) {
//     const path = await Path.findByPk(id);
//     if(!path) throw GlobalError.NOT_FOUND_DATA;
//     return await path.getUsers({attributes: columnsUser});
// }

export {
    getPaths,
    createOnlyPath,
    // AddUserToPath,
    // removeUserToPath,
    updatePath,
    // getOnePathWithUsers,
    getOnePath
}