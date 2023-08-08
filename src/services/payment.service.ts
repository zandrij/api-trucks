import { Op, Sequelize } from "sequelize";
import { GlobalError } from "../constants/global_errors";
import Payment from "../models/payment.model";
import User from "../models/user";
import Day from "../models/day.model";
import { Storage } from "../interfaces/storage.interface";
import { columnsUser } from "../constants/columns";
import Path from "../models/Path";
import Truck from "../models/truck.model";

async function getPayments({limit, page, day, path, user, status, start, end, customer}: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    let filter: any = {};
    if(day) filter.idday = {[Op.eq]: day}
    // if(path) filter.idpath = {[Op.eq]: path}
    if(user) filter.iduser = {[Op.eq]: user}
    if(status) filter.status = {[Op.eq]: status}
    if(start && end) filter.createdAt = {[Op.between]: [start, end]}
    // if(customer) filter.name = {[Op.like]: `%${customer}%`}
    // const filters ={
    //   day: day === 0 ? {} : {idday: {[Op.eq]: day}},
    //   path: path === 0 ? undefined : {idpath: {[Op.eq]: path}},
    //   user: user === 0 ? {} : {iduser: {[Op.eq]: user}},
    //   status: !status ? {} : {status: {[Op.eq]: status}},
    //   dates: !start || !end ? {} : {createdAt: }
    // }
    const { count, rows } = await Payment.findAndCountAll({
      limit,
      offset,
      subQuery: false,
      order: [["id", "DESC"]],
      where: filter,
      attributes: [
        'id',
        'idday',
        'iduser',
        'reference',
        'image',
        'type',
        'status',
        'amount',
        // [Sequelize.fn("SUM", Sequelize.col("amount")), "total"]
      ],
      // subQuery: true,
      include: [
        {
          // subQuery: false,
          model: User,
          attributes: columnsUser,
          where: customer ? {name: {[Op.like]: `%${customer}%`}} : undefined,
          as: 'client'
        },
        {
          subQuery: false,
          model: Day,
          where: path ? {idpath: {[Op.eq]: path}} : undefined,
          attributes: [
            "iddrive",
            "idtruck",
            "idpath",
            "iduser",
            "lts",
            "dateStart",
            "dateEnd",
            "status",
          ],
          include: [
            {
              // subQuery: false,
              model: Path,
            },
            {
              // subQuery: false,
              model: Truck,
            },
            {
            //   // subQuery: false,
                model: User,
                attributes: columnsUser,
                // as:'drive'
            }
          ],
        },
      ],
      // group: ['id']
    });
    return {total: count, rows, limit, page};
    // return {limit, offset, page}
}

async function updatePaymentStatus(id:number, status: "wait" | "paid" | "reject" | "aproved" | "cancel", amount:number, type: string) {
    const pay = await Payment.findByPk(id);
    if(!pay) return GlobalError.NOT_FOUND_DATA;
    pay.update({status, amount});
    return pay.toJSON();
}


async function paidPayment(id:number, {filename, reference, type, amount}: Storage) {
    const pay = await Payment.findByPk(id);
    if(!pay) return GlobalError.NOT_FOUND_DATA;
    pay.update({reference, image: filename, type, status: 'paid', amount});
    return pay.toJSON();
}

async function reportPayment({start, end, status, user, path}: any, type: string) {
  if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;

    const filters ={
    path: path === 0 ? undefined : {idpath: {[Op.eq]: path}},
    user: user === 0 ? {} : {iduser: {[Op.eq]: user}},
    status: !status ? {} : {status: {[Op.eq]: status}},
    dates: !start || !end ? {} : {createdAt: {[Op.between]: [new Date(start), new Date(end)]}}
  }

  return await Payment.findAll({
    where: {
      ...filters.dates,
      ...filters.path,
      ...filters.status,
      ...filters.user
    }
  })

  return {filters}
}

export {
    getPayments,
    updatePaymentStatus,
    paidPayment,
    reportPayment
}