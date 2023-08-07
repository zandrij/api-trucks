import { Op } from "sequelize";
import { GlobalError } from "../constants/global_errors";
import Truck from "../models/truck.model";

// obtener lista de camiones
async function getTrucks({limit, page, model, serial}: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    let filter: any = {status: {[Op.ne]: 'deleted'}};
    if(model) filter.model = {[Op.like]: `%${model}%`};
    if(serial) filter.serial = {[Op.like]: `%${serial}%`}
    const {count, rows} = await Truck.findAndCountAll({
        limit,
        offset,
        order: [['id', 'DESC']],
        where: filter
    });
    return {total: count, rows, limit, page};
    // return {limit, offset, page}
}

async function getTruck({type, id}: any) {
    if(type === 'customer') return GlobalError.NOT_PERMITED_ACCESS;
    const truck = await Truck.findOne({where: {id: id}, order: [['id', "DESC"]]});
    if(!truck) return GlobalError.NOT_FOUND_DATA;
    return truck.toJSON();
}

// crear un camion
async function createTruck(data:any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const truck = await Truck.create(data);
    return truck.toJSON();
}

// actualizar un camion
async function updateTruck(id:number, data: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const truck = await Truck.findByPk(id);
    if(!truck) return GlobalError.NOT_FOUND_DATA;
    truck.update(data)
    // day.update({status});
    return truck.toJSON();
}

// eliminar camiones
async function logicDeleteTrucks(id:number, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const truck = await Truck.findByPk(id);
    if(!truck) return GlobalError.NOT_FOUND_DATA;
    truck.update({status: 'deleted'})
    // day.update({status});
    return truck.toJSON();
}

export {
    getTrucks,
    getTruck,
    createTruck,
    updateTruck,
    logicDeleteTrucks
}