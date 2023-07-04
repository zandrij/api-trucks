import { Request, Response, Router } from "express";
import {readdirSync} from 'fs'

const PATH_ROUTER = `${__dirname}`
const router = Router();
/**
 * 
 * @param index.ts ['', item] 
 * @returns 
 */
const cleanFilename = (fileName: string) => {
    const cleanName = fileName.split('.').shift();
    if(cleanName !== 'index') {
        import(`./${cleanName}`).then((moduleRouter) => {
            console.log(`Se esta cargando la ruta ... ${cleanName}`)
           router.use(`/${cleanName}`, moduleRouter.router) 
        }).catch(e => console.log("rutas error:", e))
    }
}

readdirSync(PATH_ROUTER).filter((filename) => {
    console.log(cleanFilename(filename))
})

export {router};