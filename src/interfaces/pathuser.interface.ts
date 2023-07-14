import { Optional } from "sequelize";

export interface DayAttributes {
    id: number;
    idcustomer: number;
    idpath: number;
    createAt?: Date;
    updateAt?: Date;

}

export interface DayInput extends Optional<DayAttributes, 'id'> {}
export interface DayOuput extends Required<DayAttributes> {}