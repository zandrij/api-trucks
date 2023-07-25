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
    address!: string;
    phone!: string;
    device!: string;
    type!: "owner" | "customer" | "drive";
    status!: "active" | "deleted";
    

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
    },
    status: {
        type: DataTypes.ENUM,
        values: ['active', 'deleted']
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    device: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true,
    sequelize: sequelize,
});

export default User;