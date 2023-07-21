import { sequelize } from "../config/db";
import {DataTypes, Model} from 'sequelize'
import { PathUserAttributes, PathUserInput } from "../interfaces/pathuser.interface";
import Path from "./Path";
import User from "./user";


// class PathUser extends Model<PathUserAttributes, PathUserInput> implements PathUserAttributes {
//     id!: number;
//     // pathId!: number;
//     // userId!: number;

//     public readonly createdAt!: Date;
//     public readonly updateAt!: Date;
//     public readonly path?: Path;
//     public readonly users?: User[];
// }

// PathUser.init({
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     // userId: {
//     //     type: DataTypes.INTEGER
//     // },
//     // pathId: {
//     //     type: DataTypes.INTEGER
//     // }
// }, {
//     timestamps: true,
//     sequelize: sequelize,
//     // paranoid: true
// });
// // PathUser.hasMany(User, {foreignKey: 'UserId'})
// // User.belongsToMany(Path, {through: PathUser})
// // User.hasMany(PathUser)
// // PathUser.hasMany(User, {foreignKey: 'idcustomer'});
// // PathUser.hasMany(User, {foreignKey: 'idcustomer'});

// // Path.hasMany(Zones);

// export default PathUser;