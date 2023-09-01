import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { createDayCtrl, finallyDayCtrl, getDayCtrl, getDayOfDriverCtrl, getDaysCtrl, updateDayCtrl, updateDayStatusCtrl } from "../controllers/day";
import { createDaySchema, getDaySchema, getDaysSchema, updateDayRouteschema, updateDaySchema, updateDayStatuschema, updateFinallyDaySchema } from "../schemas/day.schema";

const router = Router();

/**
 * Get days
 * @openapi
 * /day:
 *  get:
 *      tags:
 *          - Jornadas (Days)
 *      summary: "Obtener lista de jornadas"
 *      description: Obtener lista de jornadas con (ruta, conductor, cliente, camión)
 *      parameters:
 *        - name: status
 *          in: query
 *          required: false
 *          description: estado de la jornada recibe. "wait", "charging", "dispatching", "end"
 *          enum: [ "wait", "charging", "dispatching", "end"]
 *        - name: page
 *          in: query
 *          required: false
 *          description: numero de pagina
 *        - name: limit
 *          in: query
 *          required: false
 *          description: numero de elementos(items) que quieres en la pagina
 *        - name: drive
 *          in: query
 *          required: false
 *          description: Busqueda por nombre del conductor
 *        - name: customer
 *          in: query
 *          required: false
 *          description: Busqueda por nombre del cliente
 *        - name: path
 *          in: query
 *          required: false
 *          description: Busqueda por nombre de la ruta
 *        - name: sales
 *          in: query
 *          required: false
 *          description: Busqueda por ventas en 1 dia o 1 mes recibe. (day, month)
 *      responses:
 *          '200':
 *              description: lista de rutas
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/', checkJwt, schemaValidator(getDaysSchema), getDaysCtrl);

/**
 * Get day
 * @openapi
 * /day/drive:
 *  get:
 *      tags:
 *          - Jornadas (Days)
 *      summary: "Obtener lista de jornadas del conductor"
 *      description: Obtener lista de jornadas del conductor que el estado sea diferente de "end". (debes estar logueado como conductor porque toma el id del token)
 *      responses:
 *          '200':
 *              description: lista de rutas
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/drive', checkJwt, schemaValidator(getDaysSchema), getDayOfDriverCtrl);

/**
 * Get day
 * @openapi
 * /day/{id}:
 *  get:
 *      tags:
 *          - Jornadas (Days)
 *      summary: "Obtener una jornada (day)"
 *      description: Obtener una sola jornada (day) 
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id de la jornada a buscar
 *      responses:
 *          '200':
 *              description: jornada (day)
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/:id', checkJwt, schemaValidator(getDaySchema), getDayCtrl);

/**
 * Post day
 * @openapi
 * /day/create:
 *  post:
 *      tags:
 *          - Jornadas (Days)
 *      summary: "crea una jornada (day)"
 *      description: crea una jornada (day)
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/day"
 *      responses:
 *          '200':
 *              description: Retorna la jornada
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.post('/create', checkJwt, schemaValidator(createDaySchema), createDayCtrl);

/**
 * update day
 * @openapi
 * /day/change-status/{id}:
 *  put:
 *      tags:
 *          - Jornadas (Days)
 *      summary: "Actualiza una jornada (day)"
 *      description: Actualiza una jornada (day)
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/dayStatus"
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id de la jornada a editar
 *      responses:
 *          '200':
 *              description: jornada (day) actualizado
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.put('/change-status/:id', checkJwt, schemaValidator(updateDayStatuschema), updateDayStatusCtrl);

/**
 * update day
 * @openapi
 * /day/end/{id}:
 *  put:
 *      tags:
 *          - Jornadas (Days)
 *      summary: "Finaliza una jornada (day)"
 *      description: Finaliza una jornada (day) formato de la fecha "2023-07-04 15:28:17"
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/dayEnd"
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id de la jornada a editar
 *      responses:
 *          '200':
 *              description: jornada (day) actualizado
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.put('/end/:id', checkJwt, schemaValidator(updateFinallyDaySchema), finallyDayCtrl);

/**
 * update day
 * @openapi
 * /day/{id}:
 *  put:
 *      tags:
 *          - Jornadas (Days)
 *      summary: "Editar una jornada (day)"
 *      description: Editar una jornada (day)
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/day"
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id de la jornada a editar
 *      responses:
 *          '200':
 *              description: jornada (day) actualizado
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.put('/:id', checkJwt, schemaValidator(updateDaySchema), updateDayCtrl);

export default router;