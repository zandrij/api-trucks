import { Optional } from "sequelize";

export interface PathAttributes {
    id: number;
    name: string;
    status: 'active' | 'deleted';
    createAt?: Date;
    updateAt?: Date;

}

export interface PathInput extends Optional<PathAttributes, 'id'> {}
export interface PathOuput extends Required<PathAttributes> {}