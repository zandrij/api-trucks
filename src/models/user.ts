import { sequelize } from "../config/db";
import {DataTypes, Sequelize, Model, BelongsToManyGetAssociationsMixin} from 'sequelize'
import { UserAttributes, UserInput } from "../interfaces/users";
import Path from "./Path";
import Payment from "./payment.model";


class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    id!: number;
    name!: string;
    lastName!: string;
    password!: string;
    email!: string;
    phone!: string;
    device!: string;
    dni!: string;
    address!: string;
    type!: "owner" | "customer" | "drive";
    status!: "active" | "banned" | "deleted";
    

    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
    // public readonly path?: Path[];

    // declare getUsers: BelongsToManyGetAssociationsMixin<Path>;

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
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    device: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
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
        values: ['active', 'banned', 'deleted']
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    // paranoid: true
});
// Payment.hasMany(User, {foreignKey: 'iduser'})
// User.belongsToMany(Path, {through: "PathAndUser"})

export default User;