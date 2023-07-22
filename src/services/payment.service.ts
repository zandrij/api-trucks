import { Op } from "sequelize";
import { GlobalError } from "../constants/global_errors";
import Payment from "../models/payment.model";
import User from "../models/user";
import Day from "../models/day.model";
import { Storage } from "../interfaces/storage.interface";
import { columnsUser } from "../constants/columns";

async function getPayments({limit, page, day, path, user, status, start, end}: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const filters ={
        day: day === 0 ? {} : {idday: {[Op.eq]: day}},
        path: path === 0 ? undefined : {idpath: {[Op.eq]: path}},
        user: user === 0 ? {} : {iduser: {[Op.eq]: user}},
        status: !status ? {} : {status: {[Op.eq]: status}},
        dates: !start || !end ? {} : {createdAt: {[Op.between]: [start, end]}}
    }
    const {count, rows} = await Payment.findAndCountAll({
        limit,
        offset,
        order: [['id', 'DESC']],
        where: {...filters.day, ...filters.user, ...filters.status, ...filters.dates},
        // subQuery: true,
        include: [
            {
                model: User,
                attributes: columnsUser
            },
            {
                
                model: Day,
                where: filters.path,
                attributes: ['iddrive', 'idtruck', 'idpath', 'lts', 'dateStart', 'dateEnd', 'status']
            }
        ]
    });
    return {total: count, rows, limit, page};
    // return {limit, offset, page}
}

async function updatePaymentStatus(id:number, status: "wait" | "paid" | "reject" | "aproved" | "cancel", type: string) {
    const pay = await Payment.findByPk(id);
    if(!pay) return GlobalError.NOT_FOUND_DATA;
    pay.update({status});
    return pay.toJSON();
}

async function paidPayment(id:number, {filename, reference, type}: Storage) {
    const pay = await Payment.findByPk(id);
    if(!pay) return GlobalError.NOT_FOUND_DATA;
    pay.update({reference, image: filename, type, status: "paid"});
    return pay.toJSON();
}

export {
    getPayments,
    updatePaymentStatus,
    paidPayment
}