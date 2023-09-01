import { Router } from "express";
import AuthRouter from "./auth";
import MunicipioRouter from "./municipio";
import PathRouter from "./path";
import TruckRouter from "./truck";
import UserRouter from "./user";
import DayRouter from "./day";
import PaymentRouter from "./payment";
import ReportRouter from "./report";

const router = Router();
router.use('/auth', AuthRouter)
router.use('/municipio', MunicipioRouter)
router.use('/path', PathRouter)
router.use('/truck', TruckRouter)
router.use('/user', UserRouter)
router.use('/day', DayRouter)
router.use('/payment', PaymentRouter)
router.use('/report', ReportRouter)

// const PATH_ROUTER = `${__dirname}`
// const router = Router();
// /**
//  * 
//  * @param index.ts ['', item] 
//  * @returns 
//  */
// const cleanFilename = (fileName: string) => {
//     const cleanName = fileName.split('.').shift();
//     if(cleanName !== 'index') {
//         import(`./${cleanName}`).then((moduleRouter) => {
//             console.log(`Se esta cargando la ruta ... ${cleanName}`)
//            router.use(`/${cleanName}`, moduleRouter.router) 
//         }).catch(e => console.log("rutas error:", e))
//     }
// }

// readdirSync(PATH_ROUTER).filter((filename) => {
//     console.log(cleanFilename(filename))
// })

export {router};