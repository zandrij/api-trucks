import { Optional } from "sequelize";

export interface ZonesAttributes {
    id: number;
    idpath: number;
    name: string;
    lat: number;
    lng: number;
    createAt?: Date;
    updateAt?: Date;

}

export interface ZonesInput extends Optional<ZonesAttributes, 'id'> {}
export interface ZonesOuput extends Required<ZonesAttributes> {}