import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { createOnlyPathCtrl, deleteLogicPathCtrl, getOnePathCtrl, getPathCtrl, updatePathCtrl } from "../controllers/path";
import { createOnlyPathSchema, getOnePathSchema, getPathsSchema, updatePathSchema } from "../schemas/path.schema";
import { deleteUserSchema } from "../schemas/user.schema";

const router = Router();

/**
 * Post one Path
 * @openapi
 * /path/only:
 *  post:
 *      tags:
 *          - Rutas (Paths)
 *      summary: "crea una rutas (path)"
 *      description: crea una rutas (path)
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/path"
 *      responses:
 *          '200':
 *              description: Retorna el path
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.post('/only', checkJwt, schemaValidator(createOnlyPathSchema), createOnlyPathCtrl);

/**
 * Get rutas
 * @openapi
 * /path:
 *  get:
 *      tags:
 *          - Rutas (Paths)
 *      summary: "Obtener lista de rutas"
 *      description: Obtener lista de rutas con su municipio (paginada o todas)
 *      parameters:
 *        - name: all
 *          in: query
 *          required: false
 *          description: Retorna todos los paths (true o false)
 *          type: boolean
 *        - name: page
 *          in: query
 *          required: false
 *          description: numero de pagina
 *        - name: limit
 *          in: query
 *          required: false
 *          description: numero de elementos(items) que quieres en la pagina
 *        - name: name
 *          in: query
 *          required: false
 *          description: Busqueda por nombre
 *      responses:
 *          '200':
 *              description: lista de rutas
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/', checkJwt, schemaValidator(getPathsSchema), getPathCtrl);

/**
 * update path
 * @openapi
 * /path/{id}:
 *  put:
 *      tags:
 *          - Rutas (Paths)
 *      summary: "Actualiza una ruta (path)"
 *      description: Actualiza una ruta (path)
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/path"
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id de la ruta a editar
 *      responses:
 *          '200':
 *              description: ruta (path) actualizado
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.put('/:id', checkJwt, schemaValidator(updatePathSchema), updatePathCtrl);

/**
 * Get path
 * @openapi
 * /path/only/{id}:
 *  get:
 *      tags:
 *          - Rutas (Paths)
 *      summary: "Obtener una ruta (path)"
 *      description: Obtener una sola ruta (path) con su municipio
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id de la ruta a buscar
 *      responses:
 *          '200':
 *              description: ruta (path)
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/only/:id', checkJwt, schemaValidator(getOnePathSchema), getOnePathCtrl);

/**
 * delete ruta
 * @openapi
 * /path/{id}:
 *  delete:
 *      tags:
 *          - Rutas (Paths)
 *      summary: "Eliminar un Ruta (path)"
 *      description: Eliminar un Ruta (path) - la eliminacion es logica para no interferir con los datos de la app
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id de la ruta (path) a eliminar
 *      responses:
 *          '200':
 *              description: mensage exitoso
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.delete('/:id', checkJwt, schemaValidator(deleteUserSchema), deleteLogicPathCtrl);
export default router;


