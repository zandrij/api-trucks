import { Router } from "express";
import { schemaValidator } from "../middleware/schemaValidator";
import { checkJwt } from "../middleware/session";
import { deleteUserSchema, getUserImeiSchema, getUserSchema, getUsersSchema, updateUserSchema } from "../schemas/user.schema";
import { deleteLoginUserCtrl, getUserIdCrtl, getUserImeiCrtl, getUsersCtrl, updateUserCtrl } from "../controllers/users";

const router = Router();

/**
 * Get user
 * @openapi
 * /user:
 *  get:
 *      tags:
 *          - Usuarios
 *      summary: "Obtener lista de usuarios"
 *      description: Obtener lista de usuarios
 *      parameters:
 *        - name: typeUser
 *          in: query
 *          required: false
 *          description: tipo de usuario (customer, owner, drive) - campo es opcional, para traer todos los usuarios dejalo vacio
 *        - name: page
 *          in: query
 *          required: false
 *          description: numero de pagina
 *        - name: limit
 *          in: query
 *          required: false
 *          description: numero de elementos(items) que quieres en la pagina
 *      responses:
 *          '200':
 *              description: lista de usuarios
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/', checkJwt, schemaValidator(getUsersSchema), getUsersCtrl);

/**
 * Get usuario
 * @openapi
 * /user/{id}:
 *  get:
 *      tags:
 *          - Usuarios
 *      summary: "Obtener un usuario"
 *      description: Obtener un usuario
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id del usuario a buscar
 *      responses:
 *          '200':
 *              description: usuario
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/:id', checkJwt, schemaValidator(getUserSchema), getUserIdCrtl);

/**
 * Get usuario
 * @openapi
 * /user/imei/{device}:
 *  get:
 *      tags:
 *          - Usuarios
 *      summary: "Obtener un usuario"
 *      description: Obtener un usuario
 *      parameters:
 *        - name: device
 *          in: path
 *          required: true
 *          description: numero de dispositivo del usuario a buscar
 *      responses:
 *          '200':
 *              description: usuario
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.get('/imei/:device', schemaValidator(getUserImeiSchema), getUserImeiCrtl);

/**
 * delete user
 * @openapi
 * /user/{id}:
 *  delete:
 *      tags:
 *          - Usuarios
 *      summary: "Eliminar un usuario"
 *      description: Eliminar un usuario - la eliminacion es logica para no interferir con los datos de la app
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id del usuario a eliminar
 *      responses:
 *          '200':
 *              description: mensage exitoso
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.delete('/:id', checkJwt, schemaValidator(deleteUserSchema), deleteLoginUserCtrl);

/**
 * update user
 * @openapi
 * /user/edit/{id}:
 *  put:
 *      tags:
 *          - Usuarios
 *      summary: "Actualiza un usuario"
 *      description: Actualiza un usuario (conductor, cliente, admin) - datos para actualizar son de ejemplo del cliente
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/InputCustomer"
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: id del usuario a editar
 *      responses:
 *          '200':
 *              description: usuario actualizado
 *          '400':
 *              description: error de validación
 *      security:
 *          - bearerAuth: []
 */
router.put('/edit/:id', checkJwt, schemaValidator(updateUserSchema), updateUserCtrl);

export default router;


