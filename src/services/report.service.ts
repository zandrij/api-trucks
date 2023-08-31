import {Op, Sequelize} from 'sequelize';
import { GlobalError } from "../constants/global_errors";
import User from "../models/user";
import { columnsUser } from '../constants/columns';
import Payment from '../models/payment.model';
import Path from '../models/Path';
import Day from '../models/day.model';

/**
 *  obtiene el usuario com
 * {
 *  ...usuario,
 * total: 3 // total de compras realizadasa,
 * totalAmount: 39.8 // total de dinero sumando los 3 recorridos
 * }
 */
async function getCustomerBuyTotal({limit, page, start, end}: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const dates = !start || !end ? {} : {createdAt: {[Op.between]: [start, end]}}
    
    console.log(start, end)

    const count = await User.count({where: {
        type: {[Op.eq]: 'customer'},
        
    },      include: [
        {
            model: Payment,
            where: {status: {[Op.eq]: 'aproved'}, ...dates},
            attributes: []
        }
    ],});
    

    // const rows = await User.findAll({
    //     limit,
    //     offset,
    //     // subQuery: false,
    //     order: [['total', 'DESC']],
    //     where: {
    //         type: {[Op.eq]: 'customer'},
    //     },
    //     attributes: [
    //         ...columnsUser, 
    //         [Sequelize.fn('COUNT', Sequelize.col('Payments.id')), "total"],
    //         [Sequelize.fn('SUM', Sequelize.col('Payments.amount')), "totalAmount"]
    //     ],
    //     include: [
    //         {
    //             model: Payment,
    //             // subQuery: false,
    //             // where: {
    //             //     // status: {[Op.eq]: 'aproved'}, 
    //             //     ...dates},
    //             // attributes: ['id']
    //         }
    //     ],
    //     group: ['User.id']
    // });

    const rows = await User.findAll({
        where: {type: {[Op.eq]: 'customer'}},
        attributes: [
            ...columnsUser,
            [Sequelize.fn('COUNT', Sequelize.col('Payments.id')), "total"],
            [Sequelize.fn('SUM', Sequelize.col('Payments.amount')), "totalAmount"]
        ],
        include: [
            {
                model: Payment,
                where: dates,
                attributes: []
            }
        ],
        group: ['User.id']
    })

    return {total: 0, rows, limit, page};
}

// path con contador de recorridos o jornadas
async function getPathWithDays({limit, page, start, end}: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const dates = !start || !end ? {} : {createdAt: {[Op.between]: [start, end]}}
    const count = await Path.count({include: [
        {
            model: Day,
            // subQuery: false,
            where: {status: {[Op.eq]: 'end'},...dates},
            attributes: []
        }
    ]});
    const rows = await Path.findAll({
        limit,
        offset,
        subQuery: false,
        order: [['total', 'DESC']],
        attributes: [
            'id',
            'name',
            [Sequelize.fn('COUNT', Sequelize.col('Days.id')), "total"],
            // [Sequelize.fn('SUM', Sequelize.col('Payments.amount')), "totalAmount"]
        ],
        include: [
            {
                model: Day,
                // subQuery: false,
                where: {status: {[Op.eq]: 'end'}, ...dates},
                attributes: []
            }
        ],
        group: ['Path.id']
    });
    return {total: count, rows, limit, page};
}

// path con contador de recorridos o jornadas
async function getDriverDayEnd({limit, page, start, end}: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const dates = !start || !end ? {} : {createdAt: {[Op.between]: [start, end]}}
    const count = await User.count({where: {
        type: {[Op.eq]: 'drive'}
    }, include: [
        {
            model: Day,
            where: {status: {[Op.eq]: 'end'}, ...dates},
            attributes: []
        }
    ]});
    const rows = await User.findAll({
        limit,
        offset,
        subQuery: false,
        order: [['total', 'DESC']],
        where: {
            type: {[Op.eq]: 'drive'},
        },
        attributes: [
            ...columnsUser,
            [Sequelize.fn('COUNT', Sequelize.col('Days.id')), "total"],
            // [Sequelize.fn('SUM', Sequelize.col('Payments.amount')), "totalAmount"]
        ],
        include: [
            {
                model: Day,
                where: {status: {[Op.eq]: 'end'},...dates},
                attributes: []
            }
        ],
        group: ['User.id']
    });
    return {total: count, rows, limit, page};
}

export {
    getCustomerBuyTotal,
    getPathWithDays,
    getDriverDayEnd
}