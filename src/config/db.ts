import { Dialect, Sequelize } from "sequelize";
import winston from 'winston'

const cofigEnv = {
    database: <string>process.env.DATABASE,
    username: <string>process.env.USER,
    password: <string>process.env.PASSWORD,
    host: <string>process.env.HOST,
    dialect: process.env.DIALECT as Dialect
}

const isDev = process.env.NODE_ENV === 'dev'

export const sequelize = new Sequelize({
    ...cofigEnv,
    logging: isDev ? winston.info : undefined
})

// import { Pool, createPool } from "mysql2/promise";

// export async function connect(): Promise<Pool> {
//     const connection = await createPool({
//         host: "localhost",
//         user: 'root',
//         database: 'trucks',
//         connectionLimit: 10
//     });
//     return connection;
// }