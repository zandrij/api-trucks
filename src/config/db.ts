import { Dialect, Sequelize } from "sequelize";
import winston from 'winston'

const cofigEnv = {
    database: 'defaultdb',
    username: 'doadmin',
    password: 'AVNS_Ofznn7FtY4GZ5_fTQKC',
    host: 'db-mysql-nyc1-73624-do-user-14330666-0.b.db.ondigitalocean.com',
    port: 25060,
    dialect: process.env.DIALECT as Dialect
}

// const cofigEnv = {
//     database: 'trucks',
//     username: 'root',
//     password: '',
//     host: 'localhost',
//     port: 3306,
//     dialect: process.env.DIALECT as Dialect
// }

const isDev = process.env.NODE_ENV === 'dev'

export const sequelize = new Sequelize({
    ...cofigEnv,
    logging: isDev ? winston.info : undefined
})
