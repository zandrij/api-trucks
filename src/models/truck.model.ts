import { sequelize } from "../config/db";
import {DataTypes, Model} from 'sequelize'
// import Path from "./Path.model";
// import User from "./user.model";
import { TruckAttributes, TruckInput } from "../interfaces/truck.interface";


class Truck extends Model<TruckAttributes, TruckInput> implements TruckAttributes {
    id!: number;
    color!: string;
    model!: string;
    serial!: string;
    lts!: number;
    status!:'avaible' | 'disabled' | 'working';

    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
    // public path?: Path;
    // public user?: User;

}

Truck.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    color: {
        type: DataTypes.STRING
    },
    model: {
        type: DataTypes.STRING
    },
    lts: {
        type: DataTypes.INTEGER
    },
    serial: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM,
        values: ['avaible', 'disabled', 'working']
        
    },
}, {
    timestamps: true,
    sequelize,
    // paranoid: true
});

// Day.belongsTo(Path, {foreignKey: 'idpath'})
// Day.belongsTo(User, {foreignKey: 'iddrive'})

export default Truck;