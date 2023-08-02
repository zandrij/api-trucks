import { Optional } from "sequelize";

// export interface DayRoute {
//     id: number;
//     name: string;
//     status: boolean;
// }

export interface TruckAttributes {
    id: number;
    color: string;
    model: string;
    serial: string;
    lts: number;
    status: 'avaible' | 'disabled' | 'working' | 'deleted';
    createAt?: Date;
    updateAt?: Date;

}

export interface TruckInput extends Optional<TruckAttributes, 'id'> {}
export interface TruckOuput extends Required<TruckAttributes> {}