import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { generateExcelReportSchema, getReportSchema } from "../schemas/report.schema";
import { generateExcelReportCtrl, getCustomerBuyCtrl, getDriverDayEndCtrl, getPathWithDaysCtrl, getTrucksReportCtrl } from "../controllers/report";
// import { AddUserToPathCtrl, createOnlyPathCtrl, getOnePathCtrl, getOnePathWithUsersCtrl, getPathCtrl, removeUserToPathCtrl, updatePathCtrl } from "../controllers/path";
// import { addUserToPathSchema, createOnlyPathSchema, getOnePathSchema, getPathsSchema, removeUserToPathSchema, updatePathSchema } from "../schemas/path.schema";

const router = Router();

/**
 * Get report
 * @openapi
 * /report/clients:
 *  get:
 *      tags:
 *          - Reportes
 *      summary: "Reportes de clientes con (total, amountTotal)"
 *      description: Reportes de clientes con (total - total de compras, amountTotal - monto de compra)
 *      parameters:
 *        - name: page
 *          in: query
 *          required: false
 *          description: numero de pagina
 *        - name: limit
 *          in: query
 *          required: false
 *          description: numero de elementos(items) que quieres en la pagina
 *        - name: start
 *          in: query
 *          required: false
 *          description: busqueda por fecha inicial
 *        - name: end
 *          in: query
 *          required: false
 *          description: busqueda por fecha fin
 *      responses:
 *          '200':
 *              description: lista de usuarios con (total, amount total)
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/clients', checkJwt, schemaValidator(getReportSchema), getCustomerBuyCtrl);

/**
 * Get report
 * @openapi
 * /report/paths:
 *  get:
 *      tags:
 *          - Reportes
 *      summary: "Reportes de rutas con (total)"
 *      description: Reportes de rutas con (total - total de compras)
 *      parameters:
 *        - name: page
 *          in: query
 *          required: false
 *          description: numero de pagina
 *        - name: limit
 *          in: query
 *          required: false
 *          description: numero de elementos(items) que quieres en la pagina
 *        - name: start
 *          in: query
 *          required: false
 *          description: busqueda por fecha inicial
 *        - name: end
 *          in: query
 *          required: false
 *          description: busqueda por fecha fin
 *      responses:
 *          '200':
 *              description: lista de rutas con (total)
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/paths', checkJwt, schemaValidator(getReportSchema), getPathWithDaysCtrl);

/**
 * Get report
 * @openapi
 * /report/drive:
 *  get:
 *      tags:
 *          - Reportes
 *      summary: "Reportes de conductores con (total)"
 *      description: Reportes de conductores con (total - total de compras)
 *      parameters:
 *        - name: page
 *          in: query
 *          required: false
 *          description: numero de pagina
 *        - name: limit
 *          in: query
 *          required: false
 *          description: numero de elementos(items) que quieres en la pagina
 *        - name: start
 *          in: query
 *          required: false
 *          description: busqueda por fecha inicial
 *        - name: end
 *          in: query
 *          required: false
 *          description: busqueda por fecha fin
 *      responses:
 *          '200':
 *              description: lista de conductores con (total)
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/drive', checkJwt, schemaValidator(getReportSchema), getDriverDayEndCtrl);

/**
 * Get report
 * @openapi
 * /report:
 *  get:
 *      tags:
 *          - Reportes
 *      summary: "Genera reportes en excel"
 *      description: Genera reportes en excel
 *      parameters:
 *        - name: route
 *          in: query
 *          required: false
 *          description: tipo del reporte (paths, drive, clients)
 *        - name: start
 *          in: query
 *          required: false
 *          description: busqueda por fecha inicial
 *        - name: end
 *          in: query
 *          required: false
 *          description: busqueda por fecha fin
 *      responses:
 *          '200':
 *              description: nombre del archivo excel
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/', checkJwt, schemaValidator(generateExcelReportSchema), generateExcelReportCtrl);

router.get('/trucks', checkJwt, schemaValidator(getReportSchema), getTrucksReportCtrl);

export default router;


