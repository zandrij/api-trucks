import { Optional } from "sequelize";

export interface DayRoute {
    id: number;
    name: string;
    status: boolean;
}

export interface DayAttributes {
    id: number;
    iddrive: number;
    idpath: number;
    routes: string;
    lts: number;
    dateStart: Date;
    dateEnd: Date;
    status: 'charging' | 'dispatching' | 'end';
    createAt?: Date;
    updateAt?: Date;

}

export interface DayInput extends Optional<DayAttributes, 'id'> {}
export interface DayOuput extends Required<DayAttributes> {}