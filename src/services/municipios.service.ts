import { GlobalError } from "../constants/global_errors";
import Path from "../models/Path";
import Municipio from "../models/municipio.model";

async function getMunicipios() {
    const rows = await Municipio.findAll({
        order: [['id', 'asc']],
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

async function getOneMunicipio(id:number) {
    const municipio = await Municipio.findByPk(id);
    if(!municipio) throw GlobalError.NOT_FOUND_DATA;
    return municipio.toJSON();
}

async function destroyMunicipio(id:number, type: string) {
    if(type !== 'owner') throw GlobalError.NOT_PERMITED_ACCESS;
    const municipio = await Municipio.findByPk(id);
    if(!municipio) throw GlobalError.NOT_FOUND_DATA;
    const path = await Path.findOne({where: {municipioId: municipio.id}});
    if(path) throw GlobalError.DATA_IN_USE;
    municipio.destroy()
    // day.update({status});
    return null;
}

export {
    getMunicipios,
    createOneMunicipio,
    updateMunicipio,
    getOneMunicipio,
    destroyMunicipio
}