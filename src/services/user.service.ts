import { Op, Sequelize } from "sequelize";
import { GlobalError } from "../constants/global_errors";
import User from "../models/user";
import { columnsUser } from "../constants/columns";
import Day from "../models/day.model";
import Payment from "../models/payment.model";

// obtener usuarios [todos o por tipo]
async function getUsers({limit, page, typeUser}: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const isDive = typeUser === 'drive';
    if(typeUser === 'customer') {
        return await getCustomerWithAmount({limit, page, typeUser}, offset);
    } else {
    const {rows, count} = await User.findAndCountAll({
        limit,
        offset,
        order: [['id', 'DESC']],
        subQuery: false,
        where: !typeUser ? {status: {[Op.eq]: 'active'}} : {[Op.and]: [{type: typeUser}, {status: 'active'}]},
        include: isDive ? [
            {
                model: Day,
                attributes: []
            }
        ] : undefined,
        attributes: isDive ? [...columnsUser, [Sequelize.fn('COUNT', Sequelize.col('Days.id')), 'days']] : columnsUser,
        group: ['User.id']
    })
    return {rows, limit, page, total: count.length}
    }
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
    const user = await User.findByPk(id, {attributes:{exclude: ['password']}});
    if(!user) return GlobalError.NOT_FOUND_DATA;
    user.update({status: 'deleted'})
    // day.update({status});
    return user.toJSON();
}

async function getUserId(id:number) {
    const user = await User.findOne({where: {id}, attributes: {exclude: ['password']}});
    return user;
}

async function getUserImei(device:string) {
    const user = await User.findOne({where: {device}, attributes: {exclude: ['password']}});
    return user;
}

// funciones privadas
async function getCustomerWithAmount({limit, page, typeUser}: any, offset: number):Promise<any> {
    const isCustomer = typeUser === 'customer';
    const {rows, count} = await User.findAndCountAll({
        limit,
        offset,
        order: [['totalAmount', 'DESC']],
        subQuery: false,

        where: !typeUser ? {status: {[Op.eq]: 'active'}} : {[Op.and]: [{type: typeUser}, {status: 'active'}]},
        attributes: [
            ...columnsUser, 
            [Sequelize.fn("SUM", Sequelize.col('Payments.amount')), 'totalAmount'],
            [Sequelize.fn("COUNT", Sequelize.col('Payments.id')), 'totalBuy']
        ],
        include: [
            {
                // subQuery: false,
                model: Payment,
                attributes: []
                // attributes: ['amount']
            }
        ],
        // attributes: isDive ? [...columnsUser, [Sequelize.fn('COUNT', Sequelize.col('Days.id')), 'days']] : columnsUser,
        group: ['User.id']
    });
    return {rows, limit, page, total: count.length}
}

// async function getDrivers({limit, page, typeUser}: any, offset: number):Promise<any> {
//     const {rows, count} = await User.findAndCountAll({
//         limit,
//         offset,
//         order: [['id', 'DESC']],
//         subQuery: false,
//         where: !typeUser ? {status: {[Op.eq]: 'active'}} : {[Op.and]: [{type: typeUser}, {status: 'active'}]},
//         include: isDive ? [
//             {
//                 model: Day,
//                 attributes: []
//             }
//         ] : undefined,
//         attributes: isDive ? [...columnsUser, [Sequelize.fn('COUNT', Sequelize.col('Days.id')), 'days']] : columnsUser,
//         group: ['User.id']
//     })
//     return {rows, limit, page, total: count.length}
// }


export {
    getUsers,
    updateUser,
    logicDeleteUser,
    getUserId,
    getUserImei
}