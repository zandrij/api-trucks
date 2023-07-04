import { sequelize } from "../config/db";
import {DataTypes, Sequelize, Model} from 'sequelize'
import { UserAttributes, UserInput } from "../interfaces/users";


class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    id!: number;
    name!: string;
    lastName!: string;
    password!: string;
    email!: string;
    dni!: string;
    type!: "owner" | "customer" | "drive";
    

    public readonly createdAt!: Date;
    public readonly updateAt!: Date;

}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        values: ['owner', 'customer', 'drive']
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    // paranoid: true
});

export default User;