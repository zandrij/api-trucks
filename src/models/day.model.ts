import { sequelize } from "../config/db";
import {DataTypes, Model} from 'sequelize'
import { DayAttributes, DayInput, DayRoute } from "../interfaces/day.interface";
import Path from "./Path.model";
import User from "./user.model";
import Truck from "./truck.model";


class Day extends Model<DayAttributes, DayInput> implements DayAttributes {
    id!: number;
    iddrive!: number;
    idtruck!: number;
    idpath!: number;
    lts!: number;
    routes!: string;
    dateStart!: Date;
    dateEnd!: Date;
    status!: "wait" | "charging" | "dispatching" | "end";

    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
    public path?: Path;
    public user?: User;
    public truck?: Truck;

}

Day.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    iddrive: {
        type: DataTypes.INTEGER
    },
    idtruck: {
        type: DataTypes.INTEGER
    },
    idpath: {
        type: DataTypes.INTEGER
    },
    lts: {
        type: DataTypes.INTEGER
    },
    routes: {
        type: DataTypes.TEXT
    },
    dateStart: {
        type: DataTypes.DATE
    },
    dateEnd: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM,
        values: ['wait', 'charging', 'dispatching', 'end']
    },
}, {
    timestamps: true,
    sequelize,
    // paranoid: true
});

Day.belongsTo(Path, {foreignKey: 'idpath'})
Day.belongsTo(Truck, {foreignKey: 'idtruck'})
Day.belongsTo(User, {foreignKey: 'iddrive'})

export default Day;