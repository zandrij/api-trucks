import "dotenv/config"
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerSetup from './docs/swagger';

import cors from 'cors'
import { sequelize } from "./config/db";
import { router } from "./routes";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/public', express.static(`${process.cwd()}/public`))
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerSetup))
sequelize.sync({force: false})
.then(() => console.log("connected to db"))
.catch((e) => console.log('db', e))

app.use('/api', router);

app.listen(PORT, () => console.log(`Run in http://localhost:${PORT}`))