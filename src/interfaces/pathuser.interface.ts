import { Optional } from "sequelize";

export interface PathUserAttributes {
    id: number;
    userId: number;
    pathId: number;
    createAt?: Date;
    updateAt?: Date;

}

export interface PathUserInput extends Optional<PathUserAttributes, 'id'> {}
export interface PathUserOuput extends Required<PathUserAttributes> {}