import { GlobalError } from "../constants/global_errors";
import Municipio from "../models/municipio.model";

async function getMunicipios() {
    const rows = await Municipio.findAll({
        order: [['id', 'DESC']],
    });
    return rows;
}


async function createOneMunicipio(data:any, type: string) {
    if(type !== 'owner') return GlobalError.NOT_PERMITED_ACCESS;
    const municipio = await Municipio.create({...data});
    if(!municipio) throw GlobalError.NOT_FOUND_DATA;
    return municipio.toJSON();
}


async function updateMunicipio(id:number, data: any, type: string) {
    if(type !== 'owner') throw GlobalError.NOT_PERMITED_ACCESS;
    const municipio = await Municipio.findByPk(id);
    if(!municipio) throw GlobalError.NOT_FOUND_DATA;
    municipio.update(data);
    return municipio.toJSON();
}

// async function logicDeletePath(id:number, type: string) {
//     if(type !== 'owner') throw GlobalError.NOT_PERMITED_ACCESS;
//     const path = await Path.findByPk(id);
//     if(!path) throw GlobalError.NOT_FOUND_DATA;
//     path.update({status: 'deleted'})
//     // day.update({status});
//     return path.toJSON();
// }

export {
    getMunicipios,
    createOneMunicipio,
    updateMunicipio
}