import { Optional } from "sequelize";

export interface MunicipioAttributes {
    id: number;
    name: string;
    createAt?: Date;
    updateAt?: Date;

}

export interface MunicipioInput extends Optional<MunicipioAttributes, 'id'> {}
export interface MunicipioOuput extends Required<MunicipioAttributes> {}