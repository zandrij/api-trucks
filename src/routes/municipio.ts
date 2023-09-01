import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { IdMunicipioSchema, createMunicipioSchema, updateMunicipioSchema } from "../schemas/municipio.schema";
import { createOneMunicipioCtrl, destroyMunicipioCtrl, getMunicipioCtrl, getOneMunicipioCtrl, updateMunicipioCtrl } from "../controllers/municipio";

const router = Router();

/**
 * Get municipio
 * @openapi
 * /municipio:
 *  get:
 *      tags:
 *          - municipios
 *      summary: "Obtener todos los municipios"
 *      description: Obtener todos los municipios
 *      responses:
 *          '200':
 *              description: lista de todos los municipios
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/', checkJwt, getMunicipioCtrl);

/**
 * Post municipio
 * @openapi
 * /municipio:
 *  post:
 *      tags:
 *          - municipios
 *      summary: "Crea un municipio"
 *      description: Crea un municipio
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/municipio"
 *      responses:
 *          '200':
 *              description: Retorna el municipio
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.post('/', checkJwt, schemaValidator(createMunicipioSchema), createOneMunicipioCtrl);

/**
 * update municipio
 * @openapi
 * /municipio/{id}:
 *  put:
 *      tags:
 *          - municipios
 *      summary: "Actualiza un municipio"
 *      description: Actualiza un municipio
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/municipio"
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id del municipio a buscar
 *      responses:
 *          '200':
 *              description: lista de todos los municipios
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.put('/:id', checkJwt, schemaValidator(updateMunicipioSchema), updateMunicipioCtrl);

/**
 * Get municipio
 * @openapi
 * /municipio/{id}:
 *  get:
 *      tags:
 *          - municipios
 *      summary: "Obtener un municipio"
 *      description: Obtener un solo municipio
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id del municipio a buscar
 *      responses:
 *          '200':
 *              description: municipio
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/:id', checkJwt, schemaValidator(IdMunicipioSchema), getOneMunicipioCtrl);

/**
 * delete municipio
 * @openapi
 * /municipio/{id}:
 *  delete:
 *      tags:
 *          - municipios
 *      summary: "Eliminar un municipio"
 *      description: Eliminar un municipio (si un path no lo esta usando)
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id del municipio a buscar
 *      responses:
 *          '200':
 *              description: lista de todos los municipios
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.delete('/:id', checkJwt, schemaValidator(IdMunicipioSchema), destroyMunicipioCtrl);
export default router;


