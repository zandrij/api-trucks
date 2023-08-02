import { Op } from "sequelize";
import { GlobalError } from "../constants/global_errors";
import Truck from "../models/truck.model";

// obtener lista de camiones
async function getTrucks({limit, page}: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const {count, rows} = await Truck.findAndCountAll({
        limit,
        offset,
        order: [['id', 'DESC']],
        where: {status: {[Op.ne]: 'deleted'}}
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