import { sequelize } from "../config/db";
import {DataTypes, Model} from 'sequelize'
import { ZonesAttributes, ZonesInput } from "../interfaces/zones.interface";
import Path from "./Path.model";


class Zones extends Model<ZonesAttributes, ZonesInput> implements ZonesAttributes {
    id!: number;
    idpath!: number;
    name!: string;
    lat!: number;
    lng!: number;

    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
    public path?: Path;

}

Zones.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
idpath: {
    type: DataTypes.INTEGER,
    allowNull: false
},
lat: {
    type: DataTypes.DOUBLE,
    allowNull: false
},
lng: {
    type: DataTypes.DOUBLE,
    allowNull: false
}
}, {
    timestamps: true,
    sequelize: sequelize,
    // paranoid: true
});

// Zones.belongsTo(Path)

export default Zones;