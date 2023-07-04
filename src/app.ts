import "dotenv/config"
import express from "express";
// import swaggerUI from "swagger-ui-express";
import cors from 'cors'
import { sequelize } from "./config/db";
import { router } from "./routes";
// import {router} from './routes';
// import db from "./config/db";
// import swaggerSetup from './docs/swagger';

const isDev = process.env.NODE_ENV === 'dev'
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))


sequelize.sync({force: false})
.then(() => console.log("connected to db"))
.catch((e) => console.log('db', e))

app.use('/api',router)
// app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerSetup))
// db().then(() => console.log("Connected to mongodb"))


app.listen(PORT, () => console.log(`Run in http://localhost:${PORT}`))