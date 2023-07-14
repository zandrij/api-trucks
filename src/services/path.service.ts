import { GlobalError } from "../constants/global_errors";
import Path from "../models/Path.model";
import Zones from "../models/zones.model";

async function getPaths({limit, page, zones}: any) {
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const {count, rows} = await Path.findAndCountAll({
        limit,
        offset,
        order: [['id', 'DESC']],
        // include: zones ? [
        //     {
        //         model: Zones
        //     }
        // ] : undefined
    });
    return {total: count, rows, limit, page};
    // return {limit, offset, page}
}



async function getPathOne(id:number) {
    return await Path.findOne({
        order: [['id', 'DESC']],
        where: {id},
        include: [
            {
                model: Zones
            }
        ] 
    });
}

async function createOnlyPath(data:any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const ph = await Path.create(data);
    return ph.toJSON();
}

export {
    getPaths,
    createOnlyPath,
    getPathOne
}