import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { createTruckCtrl, deleteLogicTrucksCtrl, getTruckCtrl, getTrucksCtrl, updateTruckCtrl } from "../controllers/trucks";
import { createTruckSchema, getTruckSchema, getTrucksSchema, updateTruckSchema } from "../schemas/truck.schema";
import { deleteUserSchema } from "../schemas/user.schema";

const router = Router();

/**
 * Get trucks
 * @openapi
 * /truck:
 *  get:
 *      tags:
 *          - Trucks (camiones)
 *      summary: "Obtener lista de camiones"
 *      description: Obtener lista de camiones
 *      parameters:
 *        - name: model
 *          in: query
 *          required: false
 *          description: modelo del camión
 *        - name: page
 *          in: query
 *          required: false
 *          description: numero de pagina
 *        - name: limit
 *          in: query
 *          required: false
 *          description: numero de elementos(items) que quieres en la pagina
 *        - name: serial
 *          in: query
 *          required: false
 *          description: Serial del camión
 *      responses:
 *          '200':
 *              description: lista de camiones
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/', checkJwt, schemaValidator(getTrucksSchema), getTrucksCtrl);

/**
 * Get truck
 * @openapi
 * /path/{id}:
 *  get:
 *      tags:
 *          - Trucks (camiones)
 *      summary: "Obtener un camión"
 *      description: Obtener un camión
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id del camión a buscar
 *      responses:
 *          '200':
 *              description: camiaón
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/:id', checkJwt, schemaValidator(getTruckSchema), getTruckCtrl);

/**
 * Post truck
 * @openapi
 * /truck/create:
 *  post:
 *      tags:
 *          - Trucks (camiones)
 *      summary: "crea un camión (truck)"
 *      description: crea un camión (truck)
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/truck"
 *      responses:
 *          '200':
 *              description: Retorna el path
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.post('/create', checkJwt, schemaValidator(createTruckSchema), createTruckCtrl);

/**
 * update truck
 * @openapi
 * /truck/{id}:
 *  put:
 *      tags:
 *          - Trucks (camiones)
 *      summary: "Actualiza un camión"
 *      description: Actualiza un camión
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/truck"
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id del camión a editar
 *      responses:
 *          '200':
 *              description: camión actualizado
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.put('/:id', checkJwt, schemaValidator(updateTruckSchema), updateTruckCtrl);

/**
 * delete truck
 * @openapi
 * /truck/{id}:
 *  delete:
 *      tags:
 *          - Trucks (camiones)
 *      summary: "Eliminar un camión"
 *      description: Eliminar un camión - la eliminacion es logica para no interferir con los datos de la app
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id del camión a eliminar
 *      responses:
 *          '200':
 *              description: mensage exitoso
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.delete('/:id', checkJwt, schemaValidator(deleteUserSchema), deleteLogicTrucksCtrl);
export default router;