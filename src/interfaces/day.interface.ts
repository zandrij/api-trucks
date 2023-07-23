import { Optional } from "sequelize";

export interface DayRoute {
    id: number;
    name: string;
    status: boolean;
}

export interface DayAttributes {
    id: number;
    iddrive: number;
    idtruck: number;
    idpath: number;
    iduser: number;
    routes: string;
    lts: number;
    dateStart: Date;
    dateEnd: Date;
    status: 'wait' | 'charging' | 'dispatching' | 'end' | 'null';
    createAt?: Date;
    updateAt?: Date;

}

export interface DayInput extends Optional<DayAttributes, 'id'> {}
export interface DayOuput extends Required<DayAttributes> {}