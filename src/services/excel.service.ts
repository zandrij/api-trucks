import XLSX from 'xlsx';
import { GlobalError } from '../constants/global_errors';
import {Op, Sequelize} from 'sequelize';
import User from '../models/user';
import { columnsUser } from '../constants/columns';
import Payment from '../models/payment.model';
import Path from '../models/Path';
import Day from '../models/day.model';
async function generateExcelReport({route}:any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    if(route === 'drive') {
        const rows = await User.findAll({
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
                    where: {status: {[Op.eq]: 'end'}},
                    attributes: []
                }
            ],
            group: ['User.id']
        });
        return generateXslx(rows.map(e => e.toJSON()), route);
    }

    if(route === 'paths') {
        const rows = await Path.findAll({
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
                    where: {status: {[Op.eq]: 'end'}},
                    attributes: []
                }
            ],
            group: ['Path.id']
        });
        return generateXslx(rows.map(e => e.toJSON()), route);
    }

    const rows = await User.findAll({
        subQuery: false,
        order: [['total', 'DESC']],
        where: {
            type: {[Op.eq]: 'customer'},
        },
        attributes: [
            ...columnsUser, 
            [Sequelize.fn('COUNT', Sequelize.col('Payments.id')), "total"],
            [Sequelize.fn('SUM', Sequelize.col('Payments.amount')), "totalAmount"]
        ],
        include: [
            {
                model: Payment,
                // where: {status: {[Op.eq]: 'aproved'}},
                attributes: []
            }
        ],
        group: ['User.id']
    });
    return generateXslx(rows.map(e => e.toJSON()), route);

}



function generateXslx(data: any, type: string) {
    const filename = `${type}_${Date.now().toString()}.xlsx`;
    const PATH_STORAGE = `${process.cwd()}/public`;
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, `${PATH_STORAGE}/${filename}`);
    
    return {
        data: {
            filename,
            // url: process.env.HOST
        }
    }
}

export {
    generateExcelReport
}