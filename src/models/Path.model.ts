import { sequelize } from "../config/db";
import {DataTypes, Model} from 'sequelize'
import { PathAttributes, PathInput } from "../interfaces/path.interface";
import Zones from "./zones.model";


class Path extends Model<PathAttributes, PathInput> implements PathAttributes {
    id!: number;
    name!: string;

    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
    public readonly zones?: Zones[];
}

Path.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
}, {
    timestamps: true,
    sequelize: sequelize,
    // paranoid: true
});

Path.hasMany(Zones, {foreignKey: 'idpath'});
Zones.belongsTo(Path, {foreignKey: 'idpath'});

// Path.hasMany(Zones);

export default Path;