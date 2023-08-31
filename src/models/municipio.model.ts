import { sequelize } from "../config/db";
import {DataTypes, Model} from 'sequelize'
import { MunicipioAttributes, MunicipioInput } from "../interfaces/municipio.interface";


class Municipio extends Model<MunicipioAttributes, MunicipioInput> implements MunicipioAttributes {
    id!: number;
    name!: string;

    public readonly createdAt!: Date;
    public readonly updateAt!: Date;
}

Municipio.init({
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

// Municipio.hasMany(Zones, {foreignKey: 'idMunicipio'});
// Zones.belongsTo(Municipio, {foreignKey: 'idMunicipio'});
// Municipio.hasMany(Day, {foreignKey: 'idMunicipio'});

// Municipio.hasMany(Zones);

export default Municipio;