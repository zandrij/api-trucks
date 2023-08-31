import { GlobalError } from "../constants/global_errors";
import { ZonesAttributes } from "../interfaces/zones.interface";
import Path from "../models/Path";
import Zones from "../models/zones.model";

async function getZones({limit, page, path}: any) {
    const offset = page === 1 ? 0 : Math.floor((limit * page) - limit);
    const {count, rows} = await Zones.findAndCountAll({
        limit,
        offset,
        order: [['id', 'DESC']],
        include: path ? [
            {
                model: Path
            }
        ] : undefined
    });
    return {total: count, rows, limit, page};
    // return {limit, offset, page}
}

async function getZone(id:number) {
    const zone = await Zones.findOne({where: {id}});
    return zone;
}

// async function createZone(data:any, type: string) {
//     if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
//     const pat = await Path.create({name: data.name, status: 'active'});
//     const zonesResult = data.zones.map((e: ZonesAttributes) => ({...e, idpath: pat.id}))
//     const zones = await Zones.bulkCreate(zonesResult);
//     return {...pat.toJSON(), zones};
// }

async function createOnlyZone(data:any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const zones = await Zones.create(data);
    return zones.toJSON();
}

async function DeleteOneZone(id:number, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const zones = await Zones.destroy({where: {id: id}});
    return zones;
}

async function updateOneZone(id:number, data: any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const zone = await Zones.findByPk(id);
    if(!zone) return GlobalError.NOT_FOUND_DATA;
    zone.update(data);
    return zone.toJSON();
}

export {
    // createZone,
    createOnlyZone,
    DeleteOneZone,
    updateOneZone,
    getZones,
    getZone
}